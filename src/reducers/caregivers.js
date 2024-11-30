// redux/caregiverReducer.js
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
    FETCH_AVAILABLE_CAREGIVERS_REQUEST,
    FETCH_AVAILABLE_CAREGIVERS_SUCCESS,
    FETCH_AVAILABLE_CAREGIVERS_FAILURE,
    FETCH_CAREGIVER_DETAILS_REQUEST,
    FETCH_CAREGIVER_DETAILS_SUCCESS,
    FETCH_CAREGIVER_DETAILS_FAILURE,
    GET_ASSIGNED_PATIENTS_REQUEST,
    GET_ASSIGNED_PATIENTS_SUCCESS,
    GET_ASSIGNED_PATIENTS_FAILURE,
     
} from './Types';

const initialState = {
    caregivers: [],
    loading: false,
    error: null,
    addLoading: false,
    updateLoading: false,
    deleteLoading: false,
    fetchLoading: false,
     assignLoading: false,       // Loading state for assigning a caregiver
    removeLoading: false,       // Loading state for removing a caregiver
    fetchLoading: false,        // Loading state for fetching caregivers
    assignError: null,          // Error state for assigning a caregiver
    removeError: null,          // Error state for removing a caregiver
    fetchError: null,
    availableCareGivers: [],
    availableCareGiversLoading: false,
    availableCareGiversError: null,
    caregiver: null,
    getCaregiverLoading: false,
    getCaregiverError: null,
    assignedPatients: null,
    getAssignedPatientsLoading: false,
    getAssignedPatientsError: null,
};

const caregiverReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ASSIGNED_PATIENTS_REQUEST:
      return {
        ...state,
        getAssignedPatientsLoading: true,
        getAssignedPatientsError: null,
      };

    case GET_ASSIGNED_PATIENTS_SUCCESS:
      return {
        ...state,
        getAssignedPatientsLoading: false,
        assignedPatients: action.payload,
        getAssignedPatientsError: null,
      };

    case GET_ASSIGNED_PATIENTS_FAILURE:
      return {
        ...state,
        getAssignedPatientsLoading: false,
        assignedPatients: [],
        getAssignedPatientsError: action.payload,
      };
        case FETCH_CAREGIVER_DETAILS_REQUEST:
            return { ...state, getCaregiverLoading: true, getCaregiverError: null };
        case FETCH_CAREGIVER_DETAILS_SUCCESS:
            return { 
                ...state, 
                getCaregiverLoading: false, 
                caregiver: action.payload,  
            };
        case FETCH_CAREGIVER_DETAILS_FAILURE:
            return { ...state, getCaregiverLoading: false, getCaregiverError: action.payload };
        case FETCH_AVAILABLE_CAREGIVERS_REQUEST:
            return { ...state, availableCareGiversLoading: true, availableCareGiversError: null };
        case FETCH_AVAILABLE_CAREGIVERS_SUCCESS:
            return { ...state, availableCareGivers: action.payload, availableCareGiversLoading: false };
        case FETCH_AVAILABLE_CAREGIVERS_FAILURE:
            return { ...state, availableCareGiversLoading: false, availableCareGiversError: action.payload };
        case ADD_CAREGIVER_REQUEST:
            return { ...state, addLoading: true, error: null };
        case ADD_CAREGIVER_SUCCESS:
            return { 
                ...state, 
                caregivers: [...state.caregivers, action.payload], 
                addLoading: false 
            };
        case ADD_CAREGIVER_FAILURE:
            return { ...state, addLoading: false, error: action.payload };

        case UPDATE_CAREGIVER_REQUEST:
            return { ...state, updateLoading: true, error: null };
        case UPDATE_CAREGIVER_SUCCESS:
            return { 
                ...state, 
                caregivers: state.caregivers.map(caregiver => 
                    caregiver.id === action.payload.id ? action.payload : caregiver
                ), 
                updateLoading: false 
            };
        case UPDATE_CAREGIVER_FAILURE:
            return { ...state, updateLoading: false, error: action.payload };

        case DELETE_CAREGIVER_REQUEST:
            return { ...state, deleteLoading: true, error: null };
        case DELETE_CAREGIVER_SUCCESS:
            return { 
                ...state, 
                caregivers: state.caregivers.filter(caregiver => caregiver.id !== action.payload), 
                deleteLoading: false 
            };
        case DELETE_CAREGIVER_FAILURE:
            return { ...state, deleteLoading: false, error: action.payload };

        case FETCH_CAREGIVERS_REQUEST:
            return { ...state, fetchLoading: true, error: null };
        case FETCH_CAREGIVERS_SUCCESS:
            return { ...state, caregivers: action.payload, fetchLoading: false };
        case FETCH_CAREGIVERS_FAILURE:
            return { ...state, fetchLoading: false, error: action.payload };
            case ASSIGN_CAREGIVER_REQUEST:
                return { ...state, assignLoading: true, assignError: null };
    
            case ASSIGN_CAREGIVER_SUCCESS:
                return {
                    ...state,
                    assignLoading: false,
                     
                };
    
            case ASSIGN_CAREGIVER_FAILURE:
                return { ...state, assignLoading: false, assignError: action.payload };
    
            case REMOVE_CAREGIVER_REQUEST:
                return { ...state, removeLoading: true, removeError: null };
    
            case REMOVE_CAREGIVER_SUCCESS:
                return {
                    ...state,
                    removeLoading: false,
                    removeError: null
                };
    
            case REMOVE_CAREGIVER_FAILURE:
                return { ...state, removeLoading: false, removeError: action.payload };
    
            case FETCH_ASSIGNED_CAREGIVERS_REQUEST:
                return { ...state, fetchLoading: true, fetchError: null };
    
            case FETCH_ASSIGNED_CAREGIVERS_SUCCESS:
                return { ...state, fetchLoading: false, caregivers: action.payload };
    
            case FETCH_ASSIGNED_CAREGIVERS_FAILURE:
                return { ...state, fetchLoading: false, fetchError: action.payload };
    
        default:
            return state;
    }
};

export default caregiverReducer;
