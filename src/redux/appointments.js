// src/redux/appointments/actions.js

import { auth } from '../Config/Firebase/firebase';
import {
    FETCH_APPOINTMENTS_REQUEST, FETCH_APPOINTMENTS_SUCCESS, FETCH_APPOINTMENTS_FAILURE,
    CREATE_APPOINTMENT_REQUEST, CREATE_APPOINTMENT_SUCCESS, CREATE_APPOINTMENT_FAILURE,
    UPDATE_APPOINTMENT_REQUEST, UPDATE_APPOINTMENT_SUCCESS, UPDATE_APPOINTMENT_FAILURE,
    DELETE_APPOINTMENT_REQUEST, DELETE_APPOINTMENT_SUCCESS, DELETE_APPOINTMENT_FAILURE
} from '../reducers/Types';

import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc, getDoc, query, where } from 'firebase/firestore';
import { addNotification } from './notificationActions';
import { notify } from 'reapop';
export const fetchPatientAppointments = () => async (dispatch, getState) => {
    dispatch({ type: FETCH_APPOINTMENTS_REQUEST });
    const db = getFirestore();

    try {
        const currentUser = getState()?.auth?.user;
        if (!currentUser?.roles.includes('PATIENT')) {
            dispatch(
                notify({
                    message: "You do not have access to fetch patient appointments.",
                    status: "error"
                })
            );
            return;
        }
        const q = query(collection(db, 'appointments'), where('patientId', '==', auth.currentUser.uid) )
        const querySnapshot = await getDocs(q);
        const appointments = [];

        for (const docSnapshot of querySnapshot.docs) {
            const appointmentData = { id: docSnapshot.id, ...docSnapshot.data() };

            // Fetch patient details if patientId exists
            if (appointmentData.patientId) {
                const patientDocRef = doc(db, 'users', appointmentData.patientId);
                const patientDoc = await getDoc(patientDocRef);
                if (patientDoc.exists()) {
                    appointmentData.patient = patientDoc.data();
                }
            }

            // Fetch caregiver details if caregiverId exists
            if (appointmentData.caregiverId) {
                const caregiverDocRef = doc(db, 'users', appointmentData.caregiverId);
                const caregiverDoc = await getDoc(caregiverDocRef);
                if (caregiverDoc.exists()) {
                    appointmentData.caregiver = caregiverDoc.data();
                }
            }

            appointments.push(appointmentData);
        }

        dispatch({ type: FETCH_APPOINTMENTS_SUCCESS, payload: appointments });
    } catch (error) {
        dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
        dispatch({ type: FETCH_APPOINTMENTS_FAILURE, payload: error.message });
    }
};
export const fetchCaregiverAppointments = () => async (dispatch, getState) => {
    dispatch({ type: FETCH_APPOINTMENTS_REQUEST });
    const db = getFirestore();

    try {
        const currentUser = getState()?.auth?.user;
        if (!currentUser?.roles.includes('CAREGIVER')) {
            dispatch(
                notify({
                    message: "You do not have access to fetch caregiver appointments.",
                    status: "error"
                })
            );
            return;
        }
        const q = query(collection(db, 'appointments'), where('caregiverId', '==', auth.currentUser.uid) )
        const querySnapshot = await getDocs(q);
        const appointments = [];

        for (const docSnapshot of querySnapshot.docs) {
            const appointmentData = { id: docSnapshot.id, ...docSnapshot.data() };

            // Fetch patient details if patientId exists
            if (appointmentData.patientId) {
                const patientDocRef = doc(db, 'users', appointmentData.patientId);
                const patientDoc = await getDoc(patientDocRef);
                if (patientDoc.exists()) {
                    appointmentData.patient = patientDoc.data();
                }
            }

            // Fetch caregiver details if caregiverId exists
            if (appointmentData.caregiverId) {
                const caregiverDocRef = doc(db, 'users', appointmentData.caregiverId);
                const caregiverDoc = await getDoc(caregiverDocRef);
                if (caregiverDoc.exists()) {
                    appointmentData.caregiver = caregiverDoc.data();
                }
            }

            appointments.push(appointmentData);
        }

        dispatch({ type: FETCH_APPOINTMENTS_SUCCESS, payload: appointments });
    } catch (error) {
        dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
        dispatch({ type: FETCH_APPOINTMENTS_FAILURE, payload: error.message });
    }
};
export const fetchAllAppointments = () => async (dispatch, getState) => {
    dispatch({ type: FETCH_APPOINTMENTS_REQUEST });
    const db = getFirestore();

    try {
        const currentUser = getState()?.auth?.user;
        if (!currentUser?.roles.includes('ADMIN') && !currentUser.roles.includes('SUPER_ADMIN')) {
            dispatch(
                notify({
                    message: "You do not have access to fetch appointments.",
                    status: "error"
                })
            );
            return;
        }
        const q = query(collection(db, 'appointments') )
        const querySnapshot = await getDocs(q);
        const appointments = [];

        for (const docSnapshot of querySnapshot.docs) {
            const appointmentData = { id: docSnapshot.id, ...docSnapshot.data() };

            // Fetch patient details if patientId exists
            if (appointmentData.patientId) {
                const patientDocRef = doc(db, 'users', appointmentData.patientId);
                const patientDoc = await getDoc(patientDocRef);
                if (patientDoc.exists()) {
                    appointmentData.patient = patientDoc.data();
                }
            }

            // Fetch caregiver details if caregiverId exists
            if (appointmentData.caregiverId) {
                const caregiverDocRef = doc(db, 'users', appointmentData.caregiverId);
                const caregiverDoc = await getDoc(caregiverDocRef);
                if (caregiverDoc.exists()) {
                    appointmentData.caregiver = caregiverDoc.data();
                }
            }

            appointments.push(appointmentData);
        }

        dispatch({ type: FETCH_APPOINTMENTS_SUCCESS, payload: appointments });
    } catch (error) {
        dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
        dispatch({ type: FETCH_APPOINTMENTS_FAILURE, payload: error.message });
    }
};
export const createAppointment = (appointment) => async dispatch => {
    dispatch({ type: CREATE_APPOINTMENT_REQUEST });
    const db = getFirestore();

    try {
        const docRef = await addDoc(collection(db, 'appointments'), appointment);
        const title = `New appointment created by ${auth.currentUser.displayName}`;
        const createdBy = {
            name: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
        };
        const createdAt = new Date().toLocaleString();
        dispatch(addNotification(title, createdBy, createdAt));
        dispatch(notify({message: title, status: 'success'}))
        dispatch({ type: CREATE_APPOINTMENT_SUCCESS, payload: { id: docRef.id, ...appointment } });

    } catch (error) {
        dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
        dispatch({ type: CREATE_APPOINTMENT_FAILURE, payload: error.message });
    }
};

export const updateAppointment = (appointment) => async dispatch => {
    dispatch({ type: UPDATE_APPOINTMENT_REQUEST });
    const db = getFirestore();

    try {
        const docRef = doc(db, 'appointments', appointment.id);
        await updateDoc(docRef, appointment);
        const title = `Appointment was updated by ${auth.currentUser.displayName}`;
        const createdBy = {
            name: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
        };
        const createdAt = new Date().toLocaleString();
        dispatch(addNotification(title, createdBy, createdAt));
        dispatch(notify({message: title, status: 'success'}))

        dispatch({ type: UPDATE_APPOINTMENT_SUCCESS, payload: appointment });
    } catch (error) {
        dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
        dispatch({ type: UPDATE_APPOINTMENT_FAILURE, payload: error.message });
    }
};

export const deleteAppointment = (appointmentId) => async dispatch => {
    dispatch({ type: DELETE_APPOINTMENT_REQUEST });
    const db = getFirestore();

    try {
        const docRef = doc(db, 'appointments', appointmentId);
        await deleteDoc(docRef);
        dispatch({ type: DELETE_APPOINTMENT_SUCCESS, payload: appointmentId });
        dispatch(notify({message: 'Appointment was deleted.', status: 'success'}))

    } catch (error) {
        dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
        dispatch({ type: DELETE_APPOINTMENT_FAILURE, payload: error.message });
    }
};
