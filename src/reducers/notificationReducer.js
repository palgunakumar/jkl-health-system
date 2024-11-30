// redux/notificationReducer.js
import {
    NOTIFICATIONS_FETCH_REQUEST,
    NOTIFICATIONS_FETCH_SUCCESS,
    NOTIFICATIONS_FETCH_FAILURE,
    NEW_NOTIFICATION_RECEIVED,
    CLEAR_NOTIFICATIONS,
} from './Types';

const initialState = {
    notifications: [],
    loading: false,
    error: null,
};

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFICATIONS_FETCH_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NOTIFICATIONS_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                notifications: action.payload,
                error: null,
            };
        case NOTIFICATIONS_FETCH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_NOTIFICATION_RECEIVED:
            return {
                ...state,
                notifications: [...state.notifications, action.payload],
            };
        case CLEAR_NOTIFICATIONS:
            return {
                ...state,
                notifications: [],
            };
        default:
            return state;
    }
};
