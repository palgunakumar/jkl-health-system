 import * as types from './Types';
 
  const initialState = {
     
    isEmailVerified: false,
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    user: null,
    error: null,
     currentPasswordVerified: false,
    userData: null,
    users: [],
  };
  
  export const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
  

    switch (type) {
      case types.ADD_ROLE_REQUEST:
      return { ...state, loading: true, error: null };
  
  case types.ADD_ROLE_SUCCESS:
      return {
          ...state,
          loading: false,
          users: state.users.map(user => 
            user.uid === action.payload.userId
                ? { ...user, roles: [...new Set([...user.roles, action.payload.role])] } // Add role if not present
                : user
        )
      };

  case types.ADD_ROLE_FAILURE:
      return { ...state, loading: false, error: action.payload, };
      case types.REMOVE_ROLE_REQUEST:
        return { ...state, loading: true, error: null };
    
        case types.REMOVE_ROLE_SUCCESS:
          return {
              ...state,
              loading: false,
              users: state.users.map(user => 
                  user.uid === action.payload.userId
                      ? {
                          ...user,
                          roles: user.roles.filter(role => role !== action.payload.role) // Remove the role
                      }
                      : user
              )
          };
      
  
    case types.REMOVE_ROLE_FAILURE:
        return { ...state, loading: false, error: action.payload, };
  
      case "SET_EMAIL_VERIFIED":
      return {
        ...state,
        isEmailVerified: action.payload,
      };
       
      case 'GET_USERS_META_DATA_SUCCESS':
        return{ 
          ...state,
          usersMetaData: action.payload,
          loading: false
        }
       

      case 'GET_USER_DATA_BY_ID_REQUEST':
        return {
          ...state,
          userDataloading: true,
          userData: null,
          userDataerror: null,
        } 
        case 'GET_USER_DATA_BY_ID_SUCCESS':
        return {
          ...state,
          userDataloading: false,
          userData: action.payload,
          userDataerror: null
        }
         
        case 'GET_USER_DATA_BY_ID_FAILURE':
        return {
          ...state,
          userDataloading: false,
          userDataerror: action.payload,
          userData: null
        }
        case 'GET_USERS_REQUEST':
      return {
        ...state,
        loading: true,
        users: null,
      };
        case 'GET_USERS_SUCCESS':
          return {
            ...state,
            loading: false,
            users: action.payload,
          };
        case 'GET_USERS_FAILURE':
          return {
            ...state,
            users: null,
            loading: false,
            error: action.payload,
          };
           
          case 'GET_CARE_TAKERS_REQUEST':
      return {
        ...state,
        loading: true,
        careTakers: null,
      };
        case 'GET_CARE_TAKERS_SUCCESS':
          return {
            ...state,
            loading: false,
            careTakers: action.payload,
          };
        case 'GET_CARE_TAKERS_FAILURE':
          return {
            ...state,
            careTakers: null,
            loading: false,
            error: action.payload,
          };
      case types.LOGIN_SUCCESS:

        localStorage.setItem('token', payload.token);
        return {
          ...state,
          isAuthenticated: true,
          path: action.payload.path,
          loading: false
        };
        case  'GET_CURRENT_USER_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload
      };
      case types.LOGIN_FAIL:
        localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
      case types.LOGOUT_SUCCESS:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null
        };
        case types.SENT_EMAIL_VERIFICATION_REQUEST:
          return{
            ...state,
            isEmailVerificationSent: false,
            loading: true,
          }
        case types.SENT_EMAIL_VERIFICATION_SUCCESS:
          return{
          ...state,
          isEmailVerificationSent: true,
          loading: false
  
        }
        case types.SENT_EMAIL_VERIFICATION_FAILURE:
          return{
            ...state,
            isEmailVerificationSent: false,
            loading: false,
            error: action.payload,
          }
          case types.SEND_PASSWORD_RESET_EMAIL_REQUEST:
          return{
            ...state,
            isResetEmailSent: false,
            loading: true,
          }
        case types.SEND_PASSWORD_RESET_EMAIL_SUCCESS:
          return{
          ...state,
          isResetEmailSent: true,
          loading: false
        }
        case types.SEND_PASSWORD_RESET_EMAIL_FAILURE:
          return{
            ...state,
            isResetEmailSent: false,
            loading: false,
            error: action.payload,
          }
          
        default:
            return state;
    }
  }