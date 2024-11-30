import { combineReducers } from 'redux';
import {reducer as notificationsReducer} from 'reapop';
import   { authReducer } from './auth';
import patientReducer from './patients';
import caregiverReducer from './caregivers';
import appointmentReducer from './appointments';
import { notificationReducer } from './notificationReducer';
 
const rootReducer = combineReducers({
    notifications: notificationsReducer(),
    auth: authReducer,
    patients: patientReducer,
    caregivers: caregiverReducer,
    appointments: appointmentReducer,
    notification : notificationReducer,
    
  });
  
  export default rootReducer;