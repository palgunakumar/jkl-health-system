// actions/patientActions.js
 import { 
    collection, addDoc, updateDoc, deleteDoc, doc, getDocs, 
    getDoc,
    setDoc, query, where, 
} from 'firebase/firestore';
import {
    ADD_PATIENT_REQUEST, ADD_PATIENT_SUCCESS, ADD_PATIENT_FAILURE,
    UPDATE_PATIENT_REQUEST, UPDATE_PATIENT_SUCCESS, UPDATE_PATIENT_FAILURE,
    DELETE_PATIENT_REQUEST, DELETE_PATIENT_SUCCESS, DELETE_PATIENT_FAILURE,
    GET_PATIENTS_REQUEST, GET_PATIENTS_SUCCESS, GET_PATIENTS_FAILURE, GET_UNASSIGNED_PATIENTS_REQUEST
    ,GET_UNASSIGNED_PATIENTS_SUCCESS, GET_UNASSIGNED_PATIENTS_FAILURE
} from '../reducers/Types';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { auth, emailColRef, emailDocRef, firestoreDb, functions, storage, userRef, usersRef } from '../Config/Firebase/firebase';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { notify } from 'reapop';
// Firestore collection reference
const patientsCollection = collection(firestoreDb, 'patients');
const patientById = (id) => doc(firestoreDb, `patients/${id}`);
export const filesUploadPath = (fileName) =>ref(storage, `patients/${fileName}`);
export const fileRef = (path) => ref(storage, path);

// Add a new patient a
export const addPatient = (patientData) => async (dispatch) => {
    dispatch({ type: ADD_PATIENT_REQUEST });
    const createUserFunction = httpsCallable(functions, 'createUser');
       try{
        const roles = ['PATIENT', 'USER'];
        await createUserFunction({  roles, ...patientData  });        
        dispatch({ type: ADD_PATIENT_SUCCESS, payload: { ...patientData, } });
        dispatch(notify({ id: "succes", message: "Patient has been added to the system.", status: "success" }))
    } catch (error) {
        dispatch(notify({ id: "error", message: error.message, status: "error" }))
        dispatch({ type: ADD_PATIENT_FAILURE, payload: error.message });
    }
};

// Update patient details
export const updatePatient = (patientId, updatedData) => async (dispatch) => {
    dispatch({ type: UPDATE_PATIENT_REQUEST });
    try {
         await updateDoc(userRef(patientId), updatedData);
        dispatch({ type: UPDATE_PATIENT_SUCCESS, payload: { id: patientId, ...updatedData } });
      dispatch(notify({ id: "succes", message: "Patient has been updated in the system.", status: "success" }))

    } catch (error) {
        dispatch({ type: UPDATE_PATIENT_FAILURE, payload: error.message });
    }
};

// Delete a patient
export const deletePatient = (patientId) => async (dispatch) => {
    dispatch({ type: DELETE_PATIENT_REQUEST });
    const removeUserFunction = httpsCallable(functions, 'deleteUser');

    try {      
        await removeUserFunction({  uidToDelete: patientId  });        
        dispatch({ type: DELETE_PATIENT_SUCCESS, payload: patientId });
      dispatch(notify({ id: "succes", message: "Patient has been removed from the system.", status: "success" }))

    } catch (error) {
      dispatch(notify({ id: "error", message: error.message, status: "error" }))
        dispatch({ type: DELETE_PATIENT_FAILURE, payload: error.message });
    }
};

// Get all patients
export const getPatients = () => {
  return (dispatch) => {
    dispatch({ type: GET_PATIENTS_REQUEST });
    const usersQuery = query(usersRef(), where('roles', 'array-contains', 'PATIENT'));
    getDocs(usersQuery)
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((user) => {
          if (user.data().id !== auth.currentUser.uid) {
            users.push(user.data());
          }
        });
        dispatch({ type: GET_PATIENTS_SUCCESS, payload: users });
      })
      .catch((error) => {
        dispatch({ type: GET_PATIENTS_FAILURE, payload: error.message });
        dispatch(
          notify({ id: "error", message: error.message, status: "error" })
        );
      })

  };
}
export const getUnAssignedPatients = () => {
  return async(dispatch) => {
    dispatch({ type: GET_UNASSIGNED_PATIENTS_REQUEST });
    try{
       
      const q = query(
        usersRef(),
        where("roles", "array-contains", "PATIENT")
    );

    const querySnapshot = await getDocs(q);
    const allPatients = [];

    querySnapshot.forEach(doc => {
        const data = doc.data();
        if (!data.caregiverId) { // Check if caregiverId is null or missing
            allPatients.push(data);
        }
    });           

          dispatch({ type: GET_UNASSIGNED_PATIENTS_SUCCESS, payload: allPatients });
    }
    catch (error) {
      dispatch({ type: GET_UNASSIGNED_PATIENTS_FAILURE, payload: error.message });
      dispatch(
        notify({ id: "error", message: error.message, status: "error" })
      );
    }
    
    

  };
}

export const getPatientsWithdata = () => async (dispatch) => {
    dispatch({ type: GET_PATIENTS_REQUEST });
    try {
        const patientsCollection = collection(firestoreDb, 'patients');
        const querySnapshot = await getDocs(patientsCollection);
        const patients = await Promise.all(
            querySnapshot.docs.map(async (docSnapshot) => {
                const patientData = { id: docSnapshot.id, ...docSnapshot.data() };

                // If caregiverId exists, fetch caregiver details directly from the caregivers collection path
                if (patientData.caregiverId) {
                    const caregiverDocRef = doc(firestoreDb, 'caregivers', patientData.caregiverId);
                    const caregiverDocSnapshot = await getDoc(caregiverDocRef);
                    if (caregiverDocSnapshot.exists()) {
                        patientData.caregiver = { id: caregiverDocSnapshot.id, ...caregiverDocSnapshot.data() };
                    }
                }
                return patientData;
            })
        );

        dispatch({ type: GET_PATIENTS_SUCCESS, payload: patients });
    } catch (error) {
        dispatch({ type: GET_PATIENTS_FAILURE, payload: error.message });
    }
};
export const handlePatientFileUploadProgress = (progress) => {
    return {
      type: 'PATIENTS_FILE_UPLOAD_PROGRESS',
      payload: progress,
    };
  };
  export const handlePatientsFileUpload = (url) => {
    return {
      type: 'HANDLE_PATIENTS_FILE_UPLOAD',
      payload: url,
    };
  };
  export const handlePatientsFileRemove = () => {
    return {
      type: 'HANDLE_PATIENTS_FILE_REMOVE',
    };
  };
  export const uploadPatientFiles = (file) => {
    return (dispatch) => {
      var imageFullPath = filesUploadPath(file.name);
      const uploadprogress = uploadBytesResumable(imageFullPath, file);
  
      uploadprogress.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          dispatch(handlePatientFileUploadProgress(progress));
        },
        (error) => {
          dispatch(notify({ status: "error", message: error.message }));
        },
        () => {
          getDownloadURL(uploadprogress.snapshot.ref)
            .then((url) => {
              dispatch(handlePatientsFileUpload(url));
              dispatch(notify({ status: "success", message: 'File uploaded Successfully.' }));
            })
            .catch((error) => {
              dispatch(notify({ status: "error", message: error.message }));
            });
        }
      );
    };
  };
  export const removePatientFiles = (file) => {
    return (dispatch) => {
      var imageFullPath = filesUploadPath(file.name);
      deleteObject(fileRef(imageFullPath)).then(() => {
        dispatch(handlePatientsFileRemove())
        dispatch(notify({ message: 'File Successfully Removed ', status: 'success' }))
      })
        .catch((error) => {
          dispatch(notify({ status: "error", message: error.message }));
        });
    }
  }

  // patientActions.js
export const fetchPatientDetails = (patientId) => async dispatch => {
    dispatch({ type: 'FETCH_PATIENT_DETAILS_REQUEST' });
    console.log(patientId);
    
    try {
        // Fetch patient document
        const patientSnap = await getDoc(userRef(patientId));
        
        if (!patientSnap.exists()) {
            throw new Error('Patient not found.');
        }

        const patientData = { id: patientSnap.id, ...patientSnap.data() };
        let caregiverData = null;

        // If caregiverId exists, fetch caregiver details
        if (patientData.caregiverId) {
            const caregiverRef = doc(firestoreDb, 'users', patientData.caregiverId);
            const caregiverSnap = await getDoc(caregiverRef);

            if (caregiverSnap.exists()) {
                caregiverData = { id: caregiverSnap.id, ...caregiverSnap.data() };
                // Optionally, you can nest caregiver details within the patient object
                patientData.caregiver = caregiverData;
            } else {
                console.warn(`Caregiver with ID ${patientData.caregiverId} not found.`);
            }
        }

        dispatch({ type: 'FETCH_PATIENT_DETAILS_SUCCESS', payload: patientData });
    } catch (error) {
        console.error('Error fetching patient details:', error);
        dispatch({ type: 'FETCH_PATIENT_DETAILS_FAILURE', payload: error.message });
    }
};



export const addSamplePatients = () => async dispatch => {

    const patientsData = Array.from({ length: 10 }).map((_, index) => ({
      email: `patient${index + 1}@example.com`,
      fullName: `Patient Name ${index + 1}`,
      dateOfBirth: new Date(1990 + index, 0, 1), // Random date
      gender: index % 2 === 0 ? 'Male' : 'Female',
      bloodType: ['A+', 'B+', 'O+', 'AB+'][index % 4],
      address: `1234 Sample St Apt ${index + 1}`,
      city: 'Sample City',
      state: 'Sample State',
      zipCode: 12345 + index,
      phoneNumber: `123-456-789${index}`,
      emergencyEmailAddress: `emergency${index + 1}@example.com`,
      emergencyContactName: `Emergency Contact ${index + 1}`,
      emergencyContactPhone: `987-654-321${index}`,
      emergencyContactRelationship: 'Friend',
      allergies: 'None',
      currentMedications: 'None',
      imageUrl: 'https://via.placeholder.com/150'
    }));
    patientsData.forEach((patient, index) => {
      dispatch(addPatient(patient));
    })
}