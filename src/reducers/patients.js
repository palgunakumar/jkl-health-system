import {
    ADD_PATIENT_REQUEST,
    ADD_PATIENT_SUCCESS,
    ADD_PATIENT_FAILURE,
    UPDATE_PATIENT_REQUEST,
    UPDATE_PATIENT_SUCCESS,
    UPDATE_PATIENT_FAILURE,
    DELETE_PATIENT_REQUEST,
    DELETE_PATIENT_SUCCESS,
    DELETE_PATIENT_FAILURE,
    GET_PATIENTS_REQUEST,
    GET_PATIENTS_SUCCESS,
    GET_PATIENTS_FAILURE,
    GET_UNASSIGNED_PATIENTS_REQUEST
    ,GET_UNASSIGNED_PATIENTS_SUCCESS, GET_UNASSIGNED_PATIENTS_FAILURE
} from './Types';

const initialState = {
    patients: [],
    addPatientLoading: false,
    updatePatientLoading: false,
    deletePatientLoading: false,
    getPatientsLoading: false,
    addPatientError: null,
    updatePatientError: null,
    deletePatientError: null,
    getPatientsError: null,
    getPatientLoading: false,
    getPatientError: null,
    patient: [],
    getUnassignedPatientsError: null,
    getUnassignedPatientsLoading: false,
    getUnassignedPatients: null,
};

const patientReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case GET_UNASSIGNED_PATIENTS_REQUEST: 
            return {
                ...state,
                getUnassignedPatientsError: null,
                getUnassignedPatientsLoading: true,
                getUnassignedPatients: []
            }
            case GET_UNASSIGNED_PATIENTS_SUCCESS: 
            return {
                ...state,
                getUnassignedPatientsError: null,
                getUnassignedPatientsLoading: false,
                getUnassignedPatients: action.payload
            }
            case GET_UNASSIGNED_PATIENTS_FAILURE: 
            return {
                ...state,
                getUnassignedPatientsError: action.payload,
                getUnassignedPatientsLoading: false,
                getUnassignedPatients: []
            }
        case 'FETCH_PATIENT_DETAILS_REQUEST':
            return {
                ...state,
                getPatientLoading: true,
                getPatientError: null
            }
        case 'FETCH_PATIENT_DETAILS_SUCCESS':
            return {
                ...state,
                getPatientLoading: false,
                getPatientError: null,
                patient: action.payload
            }
        case 'FETCH_PATIENT_DETAILS_FAILURE': 
            return {
                ...state,
                getPatientLoading: false,
                getPatientError: action.payload,
                patient: []
            }
        case 'PATIENTS_FILE_UPLOAD_PROGRESS':
            return {
                ...state,
                progress: action.payload
            }
        case 'HANDLE_PATIENTS_FILE_UPLOAD':
            return {
                ...state,
                imageUrl: action.payload
            }
        case 'HANDLE_PATIENTS_FILE_REMOVE':
            return {
                ...state,
                imageUrl: null,
                progress: 0,
            }
        case ADD_PATIENT_REQUEST:
            return {
                ...state,
                addPatientLoading: true,
                addPatientError: null,
            };
        case ADD_PATIENT_SUCCESS:
            return {
                ...state,
                addPatientLoading: false,
                patients: [...state.patients, action.payload],
            };
        case ADD_PATIENT_FAILURE:
            return {
                ...state,
                addPatientLoading: false,
                addPatientError: action.payload,
            };
        
        case UPDATE_PATIENT_REQUEST:
            return {
                ...state,
                updatePatientLoading: true,
                updatePatientError: null,
            };
        case UPDATE_PATIENT_SUCCESS:
            return {
                ...state,
                updatePatientLoading: false,
                patients: state.patients.map(patient =>
                    patient.id === action.payload.id ? action.payload : patient
                ),
            };
        case UPDATE_PATIENT_FAILURE:
            return {
                ...state,
                updatePatientLoading: false,
                updatePatientError: action.payload,
            };
        
        case DELETE_PATIENT_REQUEST:
            return {
                ...state,
                deletePatientLoading: true,
                deletePatientError: null,
            };
        case DELETE_PATIENT_SUCCESS:
            return {
                ...state,
                deletePatientLoading: false,
                patients: state.patients.filter(patient => patient.id !== action.payload),
            };
        case DELETE_PATIENT_FAILURE:
            return {
                ...state,
                deletePatientLoading: false,
                deletePatientError: action.payload,
            };
        
        case GET_PATIENTS_REQUEST:
            return {
                ...state,
                getPatientsLoading: true,
                getPatientsError: null,
            };
        case GET_PATIENTS_SUCCESS:
            return {
                ...state,
                getPatientsLoading: false,
                patients: action.payload,
            };
        case GET_PATIENTS_FAILURE:
            return {
                ...state,
                getPatientsLoading: false,
                getPatientsError: action.payload,
            };

        default:
            return state;
    }
};

export default patientReducer;
