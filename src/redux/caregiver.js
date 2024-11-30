import { arrayRemove, arrayUnion, getDoc, onSnapshot } from "firebase/firestore";
import { firestoreDb, functions, userRef, usersRef } from "../Config/Firebase/firebase";
import { collection, query, where, getDocs, doc, updateDoc, addDoc, deleteDoc, setDoc } from "firebase/firestore";
import {
    ADD_CAREGIVER_REQUEST, ADD_CAREGIVER_SUCCESS, ADD_CAREGIVER_FAILURE,
    UPDATE_CAREGIVER_REQUEST, UPDATE_CAREGIVER_SUCCESS, UPDATE_CAREGIVER_FAILURE,
    DELETE_CAREGIVER_REQUEST, DELETE_CAREGIVER_SUCCESS, DELETE_CAREGIVER_FAILURE,
    FETCH_CAREGIVERS_REQUEST, FETCH_CAREGIVERS_SUCCESS, FETCH_CAREGIVERS_FAILURE,
    ASSIGN_CAREGIVER_REQUEST,
    ASSIGN_CAREGIVER_SUCCESS,
    ASSIGN_CAREGIVER_FAILURE,
    REMOVE_CAREGIVER_REQUEST,
    REMOVE_CAREGIVER_SUCCESS,
    REMOVE_CAREGIVER_FAILURE,
    FETCH_ASSIGNED_CAREGIVERS_REQUEST,
    FETCH_ASSIGNED_CAREGIVERS_SUCCESS,
    FETCH_ASSIGNED_CAREGIVERS_FAILURE, 
    FETCH_AVAILABLE_CAREGIVERS_FAILURE,
    FETCH_AVAILABLE_CAREGIVERS_REQUEST, 
    FETCH_AVAILABLE_CAREGIVERS_SUCCESS,
    FETCH_CAREGIVER_DETAILS_REQUEST,
    FETCH_CAREGIVER_DETAILS_SUCCESS,
    FETCH_CAREGIVER_DETAILS_FAILURE,
    GET_ASSIGNED_PATIENTS_REQUEST, 
  GET_ASSIGNED_PATIENTS_SUCCESS, 
  GET_ASSIGNED_PATIENTS_FAILURE 
} from '../reducers/Types';
import { getPatients } from "./patientActions";
import { httpsCallable } from "firebase/functions";
import { notify } from "reapop";


export const addCaregiver = (caregiverData) => async (dispatch) => {
    dispatch({ type: ADD_CAREGIVER_REQUEST });
    const createUserFunction = httpsCallable(functions, 'createUser');

    try {
        const roles = ['CAREGIVER', 'USER'];
        await createUserFunction({  roles, ...caregiverData  });
        dispatch({
            type: ADD_CAREGIVER_SUCCESS,
            payload: { ...caregiverData }
        });
      dispatch(notify({ id: "succes", message: "Caregiver has been added to the system.", status: "success" }))

    } catch (error) {
      dispatch(notify({ id: "error", message: error.message, status: "error" }))

        dispatch({
            type: ADD_CAREGIVER_FAILURE,
            payload: error.message
        });
    }
};

// Update Caregiver Action
export const updateCaregiver = (id, updatedData) => async (dispatch) => {
    dispatch({ type: UPDATE_CAREGIVER_REQUEST });
    try {
        const caregiverDoc = doc(firestoreDb, 'caregivers', id);
        await updateDoc(caregiverDoc, updatedData);
        dispatch({
            type: UPDATE_CAREGIVER_SUCCESS,
            payload: { id, ...updatedData }
        });
      dispatch(notify({ id: "succes", message: "Caregiver has been updated in the system.", status: "success" }))

    } catch (error) {
      dispatch(notify({ id: "error", message: error.message, status: "error" }))

        dispatch({
            type: UPDATE_CAREGIVER_FAILURE,
            payload: error.message
        });
    }
};

// Delete Caregiver Action
export const deleteCaregiver = (id) => async (dispatch) => {
    dispatch({ type: DELETE_CAREGIVER_REQUEST });
    const removeUserFunction = httpsCallable(functions, 'deleteUser');

    try {
        await removeUserFunction({uidToDelete : id});
      dispatch(notify({ id: "succes", message: "Caregiver has been removed from the system.", status: "success" }))

         dispatch({
            type: DELETE_CAREGIVER_SUCCESS,
            payload: id
        });
    } catch (error) {
      dispatch(notify({ id: "error", message: error.message, status: "error" }))

        dispatch({
            type: DELETE_CAREGIVER_FAILURE,
            payload: error.message
        });
    }
};

// Fetch Caregivers Action
export const fetchCaregivers = () => async (dispatch) => {
    dispatch({ type: FETCH_CAREGIVERS_REQUEST });
    try {
    const usersQuery = query(usersRef(), where('roles', 'array-contains', 'CAREGIVER'));    
        const querySnapshot = await getDocs(usersQuery);
        
        const caregiversWithPatients = await Promise.all(querySnapshot.docs.map(async (docSnapshot) => {
            const caregiverData = { id: docSnapshot.id, ...docSnapshot.data() };
            
            // Check if the caregiver has an associated patientId
            if (caregiverData.patientId) {
                const patientRef = doc(firestoreDb, 'users', caregiverData.patientId);
                const patientSnap = await getDoc(patientRef);
                
                if (patientSnap.exists()) {
                    caregiverData.patient = { id: patientSnap.id, ...patientSnap.data() };
                }
            }
            
            return caregiverData;
        }));

        dispatch({
            type: FETCH_CAREGIVERS_SUCCESS,
            payload: caregiversWithPatients
        });
    } catch (error) {
        dispatch({
            type: FETCH_CAREGIVERS_FAILURE,
            payload: error.message
        });
    }
};
export const assignCaregiver = async (caregiverId, patientId) => {
    try {
        // Update caregiver document to link with patient
        await updateDoc(doc(firestoreDb, 'caregivers', caregiverId), { assignedPatientId: patientId, availabilityStatus: 'occupied' });

        // Update patient document to link with caregiver
        await updateDoc(doc(firestoreDb, 'patients', patientId), { assignedCaregiverId: caregiverId });
        console.log('Caregiver assigned successfully');
    } catch (error) {
        console.error('Error assigning caregiver:', error);
    }
};
export const removeCaregiver = async (caregiverId, patientId) => {
    try {
        // Unlink caregiver from patient
        await updateDoc(doc(firestoreDb, 'caregivers', caregiverId), { assignedPatientId: null, availabilityStatus: 'available' });

        // Unlink patient from caregiver
        await updateDoc(doc(firestoreDb, 'patients', patientId), { assignedCaregiverId: null });
        console.log('Caregiver removed successfully');
    } catch (error) {
        console.error('Error removing caregiver:', error);
    }
};

export const fetchAvailableCaregivers = () => async (dispatch) => {
    dispatch({ type: FETCH_AVAILABLE_CAREGIVERS_REQUEST });
    try {
        const q = query(collection(firestoreDb, "users"),where('roles', 'array-contains', 'CAREGIVER'), where("availabilityStatus", "==", "available"));
        const querySnapshot = await getDocs(q);
        const availableCaregivers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        dispatch({
            type: FETCH_AVAILABLE_CAREGIVERS_SUCCESS,
            payload: availableCaregivers
        });
    }
    catch (error) {
        dispatch({
            type: FETCH_AVAILABLE_CAREGIVERS_FAILURE,
            payload: error.message
        });
    }

};
export const assignCaregiverToPatient = (patientId, caregiverId) => {
    return async (dispatch) => {
        dispatch({ type: ASSIGN_CAREGIVER_REQUEST });

        try {
            // Reference to the user document
            const patientRef = userRef(patientId);
            const caregiverRef = userRef(caregiverId);

            // Fetch patient and caregiver data
            const patientSnap = await getDoc(patientRef);
            const caregiverSnap = await getDoc(caregiverRef);

            // Check if the patient is already assigned
            if (patientSnap.exists() && patientSnap.data().caregiverId) {
                // Patient is already assigned to a caregiver
      dispatch(notify({ id: "succes", message: "This patient is already assigned to a caregiver.", status: "warning" }))
                return dispatch({
                    type: ASSIGN_CAREGIVER_FAILURE,
                    payload: "This patient is already assigned to a caregiver."
                });
            }
            if (caregiverSnap.exists() && caregiverSnap.data().assignedPatients?.length == 3) {
                await updateDoc(caregiverRef, {
                    availabilityStatus: 'occupied',
                    assignedPatients: arrayUnion(patientId)
                });      
            }
            // Check if the caregiver has 4 assigned patients
            if (caregiverSnap.exists() && caregiverSnap.data().assignedPatients?.length >= 4) {
                await updateDoc(caregiverRef, {
                    availabilityStatus: 'occupied'
                });
                // Caregiver already has 4 patients
      dispatch(notify({ id: "succes", message: "This caregiver is already assigned to 4 patients.", status: "warning" }))

                return dispatch({
                    type: ASSIGN_CAREGIVER_FAILURE,
                    payload: "This caregiver is already assigned to 4 patients."
                });
            }

            // Update caregiver's assignedPatients array
            await updateDoc(caregiverRef, {
                assignedPatients: arrayUnion(patientId)
            });

            // Update patient document with caregiverId
            await updateDoc(patientRef, {
                caregiverId
            });

            // Dispatch success action
            dispatch(notify({ id: "succes", message: "Caregiver successfully assigned to patient.", status: "success" }))

            dispatch({ type: ASSIGN_CAREGIVER_SUCCESS, payload: { patientId, caregiverId } });

            // Optionally refetch data
            dispatch(getPatients());
            dispatch(fetchCaregivers());
        } catch (error) {
            console.error("Error assigning caregiver:", error);
            dispatch({ type: ASSIGN_CAREGIVER_FAILURE, payload: error.message });
        }
    }
};

export const getAssignedPatientsToCaregiver = (caregiverId) => {
    return async (dispatch) => {
      dispatch({ type: GET_ASSIGNED_PATIENTS_REQUEST });
  
      try {
        const q = query(
          usersRef(),
          where("roles", "array-contains", "PATIENT"),
          where("caregiverId", "==", caregiverId) // Fetch only patients assigned to the specific caregiver
        );
  
        const querySnapshot = await getDocs(q);
        const assignedPatients = [];
  
        querySnapshot.forEach((doc) => {
          assignedPatients.push(doc.data());
        });
  
        dispatch({ type: GET_ASSIGNED_PATIENTS_SUCCESS, payload: assignedPatients });
      } catch (error) {
        dispatch({ type: GET_ASSIGNED_PATIENTS_FAILURE, payload: error.message });
        dispatch(
          notify({ id: "error", message: error.message, status: "error" })
        );
      }
    };
  };
// Remove a caregiver from a patient


export const removeCaregiverFromPatient = (patientId, caregiverId) => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_CAREGIVER_REQUEST });

        try {
            console.log(patientId, caregiverId);
            
            // Reference to the user documents
            const patientRef = doc(firestoreDb, 'users', patientId);
            const caregiverRef = doc(firestoreDb, 'users', caregiverId);

            // Fetch patient and caregiver data
            const patientSnap = await getDoc(patientRef);
            const caregiverSnap = await getDoc(caregiverRef);

            // Check if the patient is assigned to a caregiver
            if (!patientSnap.exists() || !patientSnap.data().caregiverId) {
                // Patient has no caregiver assigned

                const errorMessage = "This patient is not currently assigned to any caregiver.";
                dispatch(notify({ id: "succes", message: errorMessage, status: "warning" }))

                return dispatch({
                    type: REMOVE_CAREGIVER_FAILURE,
                    payload: errorMessage
                });
            }

            // Check if the caregiver is actually assigned to the patient
            if (caregiverSnap.exists() && !caregiverSnap.data().assignedPatients?.includes(patientId)) {
                // Caregiver is not assigned to this patient
                const errorMessage = "This caregiver is not assigned to the selected patient.";
                dispatch(notify({ id: "succes", message: errorMessage, status: "warning" }))

                return dispatch({
                    type: REMOVE_CAREGIVER_FAILURE,
                    payload: errorMessage
                });
            }

            // Remove caregiverId from the patient's data
            await updateDoc(patientRef, {
                caregiverId: null // Remove the caregiver from patient data
            });

            // Remove the patient from the caregiver's assignedPatients array
            await updateDoc(caregiverRef, {
                assignedPatients: arrayRemove(patientId),
                availabilityStatus: 'available'
            });

            // Success notification
            const successMessage = "Caregiver successfully removed from the patient.";
            dispatch(notify({ id: "succes", message: successMessage, status: "success" }))
            // Dispatch success action
            dispatch({ type: REMOVE_CAREGIVER_SUCCESS, payload: { patientId, caregiverId } });

            // Optionally refetch data
            dispatch(getPatients());
            dispatch(fetchCaregivers());
        } catch (error) {
            console.error("Error removing caregiver:", error);
            dispatch({ type: REMOVE_CAREGIVER_FAILURE, payload: error.message });

            // Error notification in case of failure
            dispatch(notify({ id: "succes", message: error.message, status: "error" }))
        }
    }
};
// Fetch caregivers assigned to a specific patient
export const fetchAssignedCaregivers = (patientId) => async (dispatch) => {
    dispatch({ type: FETCH_ASSIGNED_CAREGIVERS_REQUEST });
    try {
        // Get the patient document
        const patientRef = doc(firestoreDb, 'patients', patientId);
        const patientSnap = await getDoc(patientRef);
        
        if (patientSnap.exists()) {
            const patientData = patientSnap.data();
            const assignedCaregiverIds = patientData.assignedCaregiverIds || []; // Assume an array of IDs

            // Fetch each caregiver by ID
            const assignedCaregivers = await Promise.all(
                assignedCaregiverIds.map(async (caregiverId) => {
                    const caregiverRef = doc(firestoreDb, 'caregivers', caregiverId);
                    const caregiverSnap = await getDoc(caregiverRef);
                    return { id: caregiverSnap.id, ...caregiverSnap.data() };
                })
            );

            dispatch({ type: FETCH_ASSIGNED_CAREGIVERS_SUCCESS, payload: assignedCaregivers });
        } else {
            dispatch({
                type: FETCH_ASSIGNED_CAREGIVERS_FAILURE,
                payload: 'Patient not found or has no assigned caregivers.'
            });
        }
    } catch (error) {
        dispatch({
            type: FETCH_ASSIGNED_CAREGIVERS_FAILURE,
            payload: error.message
        });
    }
};
export const fetchCaregiverDetails = (caregiverId) => async (dispatch) => {
    dispatch({ type: FETCH_CAREGIVER_DETAILS_REQUEST });

    try {
        const caregiverRef = doc(firestoreDb, "users", caregiverId);

        // Set up a listener for the caregiver document
        const unsubscribe = onSnapshot(caregiverRef, async (caregiverSnap) => {
            if (!caregiverSnap.exists()) {
                throw new Error("Caregiver not found.");
            }

            const caregiverData = { id: caregiverSnap.id, ...caregiverSnap.data() };

            let assignedPatientsData = [];

            // Fetch data for each assigned patient without setting listeners
            if (Array.isArray(caregiverData.assignedPatients)) {
                const patientFetchPromises = caregiverData.assignedPatients.map(async (patientId) => {
                    const patientRef = doc(firestoreDb, "users", patientId);
                    const patientSnap = await getDoc(patientRef);

                    if (patientSnap.exists()) {
                        return { id: patientSnap.id, ...patientSnap.data() };
                    } else {
                        console.warn(`Patient with ID ${patientId} not found.`);
                        return null;
                    }
                });

                // Await and filter results for successful patient fetches
                assignedPatientsData = (await Promise.all(patientFetchPromises)).filter(Boolean);
            }

            // Dispatch caregiver data with initially fetched patient data
            dispatch({
                type: FETCH_CAREGIVER_DETAILS_SUCCESS,
                payload: { assignedPatientsData, ...caregiverData },
            });
        });

        return unsubscribe; // Return the unsubscribe function for cleanup
    } catch (error) {
        console.error("Error fetching caregiver details:", error);
        dispatch({ type: FETCH_CAREGIVER_DETAILS_FAILURE, payload: error.message });
    }
};


export const addSampleCaregivers = () => async dispatch => {

    const patientsData = Array.from({ length: 10 }).map((_, index) => ({
      email: `caregiver${index + 1}@example.com`,
      fullName: `caregiver Name ${index + 1}`,
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
      imageUrl: 'https://via.placeholder.com/150',
      availabilityStatus: 'available',
    }));
    patientsData.forEach((caregiver, index) => {
        setTimeout(() => {
            dispatch(addCaregiver(caregiver));
        }, [index * 2000])
    })
}