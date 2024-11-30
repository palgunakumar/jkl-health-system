// src/redux/appointments/reducer.js

import {
    FETCH_APPOINTMENTS_REQUEST, FETCH_APPOINTMENTS_SUCCESS, FETCH_APPOINTMENTS_FAILURE,
    CREATE_APPOINTMENT_REQUEST, CREATE_APPOINTMENT_SUCCESS, CREATE_APPOINTMENT_FAILURE,
    UPDATE_APPOINTMENT_REQUEST, UPDATE_APPOINTMENT_SUCCESS, UPDATE_APPOINTMENT_FAILURE,
    DELETE_APPOINTMENT_REQUEST, DELETE_APPOINTMENT_SUCCESS, DELETE_APPOINTMENT_FAILURE
} from './Types';

const initialState = {
    appointments: [],
    loading: false,
    error: null,
};

const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_APPOINTMENTS_REQUEST:
        case CREATE_APPOINTMENT_REQUEST:
        case UPDATE_APPOINTMENT_REQUEST:
        case DELETE_APPOINTMENT_REQUEST:
            return {
                ...state,
                appointments: [],
                loading: true,
                error: null,
            };
        case FETCH_APPOINTMENTS_SUCCESS:
            return {
                ...state,
                appointments: action.payload,
                loading: false,
                error: null,
            };
        case CREATE_APPOINTMENT_SUCCESS:
            return {
                ...state,
                appointments: [...state.appointments, action.payload],
                loading: false,
                error: null,
            };
        case UPDATE_APPOINTMENT_SUCCESS:
            return {
                ...state,
                appointments: state.appointments.map(appointment =>
                    appointment.id === action.payload.id ? action.payload : appointment
                ),
                loading: false,
                error: null,
            };
        case DELETE_APPOINTMENT_SUCCESS:
            return {
                ...state,
                appointments: state.appointments.filter(appointment => appointment.id !== action.payload),
                loading: false,
                error: null,
            };
        case FETCH_APPOINTMENTS_FAILURE:
        case CREATE_APPOINTMENT_FAILURE:
        case UPDATE_APPOINTMENT_FAILURE:
        case DELETE_APPOINTMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default appointmentReducer;
