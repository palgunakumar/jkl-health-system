// redux/notificationActions.js
import {
    NOTIFICATIONS_FETCH_REQUEST,
    NOTIFICATIONS_FETCH_SUCCESS,
    NOTIFICATIONS_FETCH_FAILURE,
    NEW_NOTIFICATION_RECEIVED,
    CLEAR_NOTIFICATIONS,
} from '../reducers/Types';
import { getDatabase, ref, onValue, off, push } from 'firebase/database';

export const fetchNotifications = () => (dispatch) => {
    dispatch({ type: NOTIFICATIONS_FETCH_REQUEST });

    const db = getDatabase();
    const notificationsRef = ref(db, 'notifications'); // Adjust the path to your notifications location in Firebase

    // Set up real-time listener
    onValue(notificationsRef, (snapshot) => {
        const notifications = snapshot.val() ? Object.values(snapshot.val()) : [];
        dispatch({ type: NOTIFICATIONS_FETCH_SUCCESS, payload: notifications });
    }, (error) => {
        dispatch({ type: NOTIFICATIONS_FETCH_FAILURE, payload: error.message });
    });

    // Listen for new notifications in real-time
    // onValue(notificationsRef, (snapshot) => {
    //     snapshot.forEach((childSnapshot) => {
    //         dispatch({
    //             type: NEW_NOTIFICATION_RECEIVED,
    //             payload: { id: childSnapshot.key, ...childSnapshot.val() },
    //         });
    //     });
    // });
};

export const addNotification = (title, createdBy, createdAt) => {
    const db = getDatabase();

    const notificationsRef = ref(db, 'notifications'); // Reference to 'notifications' node in Realtime Database
  
    const notificationData = {
      title,
      createdBy,
      createdAt,
    };
  
    // Push the notification to the database
    push(notificationsRef, notificationData)
      .then(() => {
        console.log('Notification added successfully');
      })
      .catch((error) => {
        console.error('Error adding notification: ', error);
      });
  };

// Action to clear notifications
export const clearNotifications = () => (dispatch) => {
    dispatch({ type: CLEAR_NOTIFICATIONS });
};
