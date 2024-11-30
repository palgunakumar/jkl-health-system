import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { dismissNotification, notify } from "reapop";
import { arrayRemove, arrayUnion, doc, getDoc, getDocs, query, updateDoc, where,  } from "firebase/firestore";

import * as Types from '../reducers/Types'
import { auth, userRef, batch, emailDocRef, usersRef, firestoreDb } from "../Config/Firebase/firebase";
export const loginRequest = () => ({
    type: 'LOGIN_REQUEST'
  });
  
  export const loginSuccess = (token, path) => ({
    type: 'LOGIN_SUCCESS',
    payload: { token, path }
  });
  
  export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error
  });
  
  export const logoutRequest = () => ({
    type: 'LOGOUT_REQUEST'
  });
  
  export const logoutSuccess = () => ({
    type: 'LOGOUT_SUCCESS'
  });
  
  export const logoutFailure = (error) => ({
    type: 'LOGOUT_FAILURE',
    payload: error
  });
  const createNewUserRequest = () => {
    return {
      type: 'CREATE_NEW_USER_REQUEST',
    };
  };
  const createNewUserSuccess = (action) => {
    return {
      type: 'CREATE_NEW_USER_SUCCESS',
      payload: action,
    };
  };
  const createNewUserFailure = (error) => {
    return {
      type: 'CREATE_NEW_USER_FAILURE',
      payload: error,
    };
  };
export const getCurrentUserDataRequest = () => {
    return {
      type: 'GET_CURRENT_USER_DATA_REQUEST',
    };
  };
  export const getCurrentUserDataSuccess = (data) => {
    return {
      type: 'GET_CURRENT_USER_DATA_SUCCESS',
      payload: data,
    };
  };
  export const getCurrentUserDataFailure = (error) => {
    return {
      type: 'GET_CURRENT_USER_DATA_FAILURE',
      payload: error,
    };
  };
  
export const sendEmailVerificationRequest = () => {
    return {
      type: 'SENT_EMAIL_VERIFICATION_REQUEST',
    };
  };
  export const sendEmailVerificationSuccess = () => {
    return {
      type: 'SENT_EMAIL_VERIFICATION_SUCCESS',
    };
  };
  export const sendEmailVerificationFailure = (error) => {
    return {
      type: 'SENT_EMAIL_VERIFICATION_FAILURE',
      payload: error,
    };
  };
  export const sendPasswordResetEmailRequest = () => {
    return {
      type: 'SEND_PASSWORD_RESET_EMAIL_REQUEST',
    };
  };
  export const sendPasswordResetEmailSuccess = (status) => {
    return {
      type: 'SEND_PASSWORD_RESET_EMAIL_SUCCESS',
      status: status
    };
  };
  export const sendPasswordResetEmailFailure = (error) => {
    return {
      type: 'SEND_PASSWORD_RESET_EMAIL_FAILURE',
      payload: error,
    };
  };
export const getCurrentUserData = (userId) => {
    return (dispatch) => {
      dispatch(getCurrentUserDataRequest());
      getDoc(userRef(userId))
        .then((info) => {          
          dispatch(getCurrentUserDataSuccess(info.data()));
        })
        .catch((error) => {
          dispatch(getCurrentUserDataFailure(error));
          dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
        });
    };
  };
  export const loginUser = (email, password, path, navigate) => (dispatch) => {
    dispatch(loginRequest());
    dispatch(
      notify({ id: "loading", message: "logging in...", status: "loading" })
    );
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;    
        getDoc(userRef(user.uid)).then((user) => {
            const userData = user.data();        
               dispatch(getCurrentUserData(userData.uid));
              dispatch(dismissNotification("loading"));
              dispatch(loginSuccess(userData, path));
               dispatch(notify({ message: `Welcome back ${userData?.displayName ? userData?.displayName : userData?.firstName} !`, status: 'success' }))
             
          })    
      })
      .catch((error) => {
        const errorCode = error.code;
  
        if (errorCode === Types.ERROR_CODE_WRONG_PASSWORD) {
          dispatch(
            notify({
              id: "error",
              message: `Wrong Password! \n Please try again`,
              status: "error",
            })
          );
          dispatch(dismissNotification("loading"));
          dispatch(loginFailure(error));
        }
        else if (errorCode === Types.ERROR_CODE_INVALID_CREDENTIALS) {
          dispatch(
            notify({
              id: "error",
              message: `Wrong Email or Password! \n Please try again`,
              status: "error",
            })
          );
          dispatch(dismissNotification("loading"));
          dispatch(loginFailure(error));
        } else if (errorCode === Types.ERROR_CODE_TOO_MANY_ATTEMPTS) {
          dispatch(
            notify({
              id: "error",
              message: `Access to this account has been temporarily disabled due to many failed login attempts.\n You can immediately restore it by resetting your password or you can try again later.`,
              status: "error",
            })
          );
          dispatch(dismissNotification("loading"));
          dispatch(loginFailure(error));
        } else {
          dispatch(loginFailure(error));
          dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
          dispatch(dismissNotification("loading"));
        }
        dispatch(loginFailure(error.message));
      });
  };
  export const loginWithGoogle = (path) => {
    return async (dispatch) => {
      try {
        dispatch(loginRequest());
        dispatch(
          notify({ id: "loading", message: "logging in...", status: "loading" })
        );
        const googleAuthProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleAuthProvider)
      .then((userCredential) => {      
        const User = userCredential?.user;  
                 
        getDoc(userRef(User.uid)).then((user) => {
            if(user.exists()){
              const userData = user.data();
              dispatch(getCurrentUserData(user.id));
              dispatch(dismissNotification("loading"));  
              dispatch(loginSuccess(userData, path));
              dispatch(notify({ message: `Welcome back ${userData?.displayName ? userData?.displayName : userData?.firstName} !`, status: 'success' }))
      
            }     
            else {
            const { auth, metadata, proactiveRefresh, reloadUserInfo,  stsTokenManager,  tenantId,  ...formInfo } = User;

              const userData = {
                ...formInfo,
                 
                creationTime: new Date(),
                 roles: ['USER'],
                permissions: {},
              }
              batch.set(userRef(User.uid), userData);
              const year = new Date().getFullYear();
          batch.set((emailDocRef(formInfo.uid)), {
            to: formInfo.email,
            message: {
              subject: `Welcome to JKL Health Services , ${formInfo.displayName}!`,
              html: `
      <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Welcome to JKL Health Services </title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f6f6f6;
              margin: 0;
              padding: 0;
              line-height: 1.6;
          }
          .container {
              max-width: 600px;
              background-color: #ffffff;
              margin: 30px auto;
              padding: 20px;
              border-radius: 8px;
              border: 1px solid #e0e0e0;
          }
          h1 {
              color: #333333;
          }
          p {
              color: #555555;
          }
          .button {
              display: inline-block;
              background-color: #007bff;
              color: #ffffff !important;
              padding: 12px 20px;
              margin: 20px 0;
              text-decoration: none;
              border-radius: 5px;
          }
          .button:hover {
              background-color: #0056b3;
          }
          .footer {
              text-align: center;
              color: #888888;
              font-size: 12px;
              margin-top: 30px;
          }
          .footer a {
              color: #888888;
              text-decoration: none;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Welcome to JKL Health Services , ${formInfo.displayName}!</h1>
          </div>
          <div class="content">
              <p>Hello ${formInfo.displayName},</p>
              <p>We are excited to have you on board! At JKL Health Services , we’re committed to providing you with the best experience. You can now explore all the features and get started with your journey.</p>
              <p>If you have any questions or need support, feel free to reach out to us at <a href="mailto:jklhealthcare85@gmail.com">jklhealthcare85@gmail.com
</a>. We're here to help!</p>
              <p>To get started, click the button below:</p>
              <a href="https://jkl-healthcare.web.app/login" class="button">Get Started</a>
          </div>
          <div class="footer">
              <p>&copy; ${year} JKL Health Services . All rights reserved.</p>
              <p><a href="https://jkl-healthcare.web.app/">Visit our website</a></p>
          </div>
      </div>
  </body>
  </html>
  
    `
            },
  
          })
          batch
            .commit()
            .then(() => {
              dispatch(createNewUserSuccess(userData));
              dispatch(getCurrentUserData(userData.uid));
              dispatch(
                notify({
                  message: "User created successfully!.",
                  status: "success",
                })
              );
               
               dispatch(dismissNotification("loading"));
              window.location.href = '/'
  
            })
            .catch((error) => {
              dispatch(createNewUserFailure(error));
              dispatch(
                notify({ id: "error", message: error.message, status: "error" })
              );
            });
            }
          })       
      })
      .catch((error) => {
        const errorCode = error.code;
  
        if (errorCode === Types.ERROR_CODE_WRONG_PASSWORD) {
          dispatch(
            notify({
              id: "error",
              message: `Wrong Password! \n Please try again`,
              status: "error",
            })
          );
          dispatch(dismissNotification("loading"));
          dispatch(loginFailure(error));
        }
        else if (errorCode === Types.ERROR_CODE_INVALID_CREDENTIALS) {
          dispatch(
            notify({
              id: "error",
              message: `Wrong Email or Password! \n Please try again`,
              status: "error",
            })
          );
          dispatch(dismissNotification("loading"));
          dispatch(loginFailure(error));
        } else if (errorCode === Types.ERROR_CODE_TOO_MANY_ATTEMPTS) {
          dispatch(
            notify({
              id: "error",
              message: `Access to this account has been temporarily disabled due to many failed login attempts.\n You can immediately restore it by resetting your password or you can try again later.`,
              status: "error",
            })
          );
          dispatch(dismissNotification("loading"));
          dispatch(loginFailure(error));
        } else {
          dispatch(loginFailure(error));
          dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
          dispatch(dismissNotification("loading"));
        }
        dispatch(loginFailure(error.message));
      });
      }
      catch (error) {
      }
    }
  }
  export const createUserDataonSignup = (data, form) => {
    return (dispatch, getState) => {
      let userId = data.user.uid;
      let user = data.user;
      const { password, confirm_password, ...formInfo } = form;
      const userData = {
        ...formInfo,
        email: user.email,
        id: user.uid,
         photoURL: user.photoURL,
        providerData: user.providerData,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        accessToken: user.accessToken,
        creationTime: new Date(),
        lastSignInTime: user.metadata.lastSignInTime,
        roles: ['USER'],
         permissions: {},
      }
      dispatch(createNewUserRequest());
      dispatch(
        notify({
          id: "loading",
          message: "logging in...",
          status: "loading",
          dismissAfter: 100000,
        })
      );
      getDoc(userRef(userId)).then((info) => {
        if (info.exists()) {
          dispatch(
            notify({
              message: "User already exists!.",
              status: "success",
              dismissAfter: 5000,
            })
          );
        } else {
          batch.set(userRef(userId), userData);
          updateProfile(auth.currentUser, {
            displayName: formInfo.firstName + ' ' + formInfo.lastName
          })
           
           
  
           
           
          const year = new Date().getFullYear();
          batch.set((emailDocRef(user.uid)), {
            to: user.email,
            message: {
              subject: `Welcome to JKL Health Services , ${user.displayName}!`,
              html: `
      <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Welcome to JKL Health Services </title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f6f6f6;
              margin: 0;
              padding: 0;
              line-height: 1.6;
          }
          .container {
              max-width: 600px;
              background-color: #ffffff;
              margin: 30px auto;
              padding: 20px;
              border-radius: 8px;
              border: 1px solid #e0e0e0;
          }
          h1 {
              color: #333333;
          }
          p {
              color: #555555;
          }
          .button {
              display: inline-block;
              background-color: #007bff;
              color: #ffffff !important;
              padding: 12px 20px;
              margin: 20px 0;
              text-decoration: none;
              border-radius: 5px;
          }
          .button:hover {
              background-color: #0056b3;
          }
          .footer {
              text-align: center;
              color: #888888;
              font-size: 12px;
              margin-top: 30px;
          }
          .footer a {
              color: #888888;
              text-decoration: none;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Welcome to JKL Health Services , ${user.displayName}!</h1>
          </div>
          <div class="content">
              <p>Hello ${user.displayName},</p>
              <p>We are excited to have you on board! At JKL Health Services , we’re committed to providing you with the best experience. You can now explore all the features and get started with your journey.</p>
              <p>If you have any questions or need support, feel free to reach out to us at <a href="mailto:jklhealthcare85@gmail.com">jklhealthcare85@gmail.com</a>. We're here to help!</p>
              <p>To get started, click the button below:</p>
              <a href="https://jkl-healthcare.web.app/login" class="button">Get Started</a>
          </div>
          <div class="footer">
              <p>&copy; ${year} JKL Health Services . All rights reserved.</p>
              <p><a href="https://jkl-healthcare.web.app/">Visit our website</a></p>
          </div>
      </div>
  </body>
  </html>
  
    `
            },
  
          })
          batch
            .commit()
            .then(() => {
              dispatch(createNewUserSuccess(userData));
              dispatch(getCurrentUserData(userId));
              dispatch(
                notify({
                  message: "User created successfully!.",
                  status: "success",
                })
              );
               
               dispatch(dismissNotification("loading"));
              window.location.href = '/'
  
            })
            .catch((error) => {
              dispatch(createNewUserFailure(error));
              dispatch(
                notify({ id: "error", message: error.message, status: "error" })
              );
            });
        }
      }).catch((error) => {
        dispatch(loginFailure(error));
        dispatch(
          notify({ id: "error", message: error.message, status: "error" })
        );
        dispatch(dismissNotification("loading"));
      })
    };
  };
  export const signupUser = (form) => {
    return (dispatch) => {
      dispatch({ type: 'SIGNUP_REQUEST' })
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
          dispatch(doSendEmailVerification())
          if(userCredential.user.uid){
            getDoc(userRef(userCredential.user.uid)).then((user) => {
              if(!user.exists){
                dispatch(createUserDataonSignup(userCredential, form))
              }
              else {
                dispatch(getCurrentUserData(user.id));
              }
            })
          }
          dispatch({
            type: 'SIGNUP_SUCCESS',
            payload: userCredential.user,
          });
        })
        .catch((error) => {
          dispatch({
            type: 'SIGNUP_FAILURE',
            payload: error.message,
          });
          if (error.code === Types.ERROR_CODE_ACCOUNT_ALREADY_EXISTS) {
            dispatch(loginFailure(error));
            dispatch(createNewUserFailure(Types.ERROR_MSG_ACCOUNT_EXISTS));
            dispatch(
              notify({
                id: "error",
                message: Types.ERROR_MSG_ACCOUNT_EXISTS,
                status: "error",
              })
            );
            dispatch(
              notify({
                id: "loading",
                message: "Taking you to the login page...",
                status: "loading",
              })
            );
            dispatch(dismissNotification("loading"));
          } else if (error.code === Types.ERROR_CODE_ACCOUNT_ALREADY_EXISTS) {
            dispatch(loginFailure(error));
            dispatch(createNewUserFailure(Types.ERROR_MSG_ACCOUNT_ALREADY_EXISTS));
            dispatch(
              notify({
                id: "error",
                message: Types.ERROR_MSG_ACCOUNT_ALREADY_EXISTS,
                status: "error",
              })
            );
            dispatch(
              notify({
                id: "loading",
                message: "Taking you to the login page...",
                status: "loading",
              })
            );
            dispatch(dismissNotification("loading"));
          } else {
            dispatch(createNewUserFailure(error));
            dispatch(loginFailure(error));
            dispatch(
              notify({ id: "error", message: error.message, status: "error" })
            );
          }
        });
    };
  };

  export const logoutUser = () => {
    return (dispatch, getState) => {
      dispatch({ type: 'LOGOUT_REQUEST' });
       const log = getState?.auth?.loginLogs;
      if (log) {
        const userLogDetails = {
          ...log,
          securityQuestionsVerified: true,
          lastLoginAt: new Date(),
        }
        localStorage.setItem('userLogId', JSON.stringify(userLogDetails));
        auth.signOut()
        .then(() => {
          dispatch({ type: 'LOGOUT_SUCCESS' });
          window.location.reload();
        })
        .catch((error) => {
          dispatch({ type: 'LOGOUT_FAILURE', payload: error.message });
        });
      }
      else {
        auth.signOut()
          .then(() => {
            dispatch({ type: 'LOGOUT_SUCCESS' });
  
          })
          .catch((error) => {
            dispatch(
              notify({ id: "error", message: error.message, status: "error" })
            );
            dispatch({ type: 'LOGOUT_FAILURE', payload: error.message });
          });
      }
    };
  };
  export const doSendEmailVerification = () => {
    return (dispatch) => {
      dispatch(sendEmailVerificationRequest());
      dispatch(
        notify({
          id: "loading",
          message: "sending email verification...",
          status: "loading",
        })
      );
      const isEmailVerified = auth.currentUser.emailVerified;
      if (isEmailVerified) {
        dispatch(
          notify({ message: "Your account was already verified.", status: "success" })
        );
        dispatch(dismissNotification("loading"));
      }
      else {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            dispatch(sendEmailVerificationSuccess());
            dispatch(
              notify({ message: "email verification sent.", status: "success" })
            );
            dispatch(dismissNotification("loading"));
          })
          .catch((error) => {
            dispatch(sendEmailVerificationFailure(error));
            dispatch(notify({ message: error.message, status: "error" }));
            dispatch(dismissNotification("loading"));
          });
      }
    };
  };
  export const doSendPasswordResetEmail = (email) => {
    return (dispatch) => {
      dispatch(
        notify({
          id: "loading",
          message: `sending reset email to ${email}.`,
          status: "loading",
        })
      );
      dispatch(sendPasswordResetEmailRequest())
      sendPasswordResetEmail(auth, email)
        .then(() => {
          dispatch(sendPasswordResetEmailSuccess({ status: "success" }));
          dispatch(dismissNotification("loading"));
          dispatch(
            notify({
              message: `Password reset email sent to ${email}.`,
              status: "success",
            })
          );
        })
        .catch((error) => {
          dispatch(sendEmailVerificationFailure(error));
          dispatch(notify({ message: error.message, status: "error" }));
          dispatch(dismissNotification("loading"));
        })
    }
  }

  export const getUsers = () => {
    return (dispatch) => {
      dispatch({ type: 'GET_USERS_REQUEST' });
  
      getDocs(usersRef())
        .then((snapshot) => {
          const users = [];
          snapshot.forEach((user) => {
            users.push(user.data());
          });
          dispatch({ type: 'GET_USERS_SUCCESS', payload: users });
        })
        .catch((error) => {
          dispatch(
            notify({ id: "error", message: error.message, status: "error" })
          );
          dispatch({ type: 'GET_USERS_FAILURE', payload: error });
         });
    };
  };
 
  export const updateProfileInformatio = (userData) => {
    return async (dispatch) => {
      dispatch({type: 'UPDATE_PROFILE_INFORMATION_REQUEST'});
      try{
          await updateDoc(userRef(userData?.uid), { ...userData})
          await updateProfile(auth.currentUser , { displayName: userData?.displayName, photoURL: userData?.photoURL})
          dispatch({type: 'UPDATE_PROFILE_INFORMATION_SUCCESS'});
          dispatch(getCurrentUserData(userData?.uid))
        }
      catch (error) {
        dispatch(
          notify({ id: "error", message: error.message, status: "error" })
        );
        dispatch({ type: 'UPDATE_PROFILE_INFORMATION_FAILURE', payload: error.message });

      }
    }
  }
  const roles = [
    'ADMIN',
    'USER',
    'SUPER_ADMIN',
    'PATIENT',
    'CAREGIVER'
  ]
  export const addUserRole = (userId, role) => async (dispatch, getState) => {
    // Check if role is valid
    if (!roles.includes(role)) {
        dispatch(
            notify({
                message: "Invalid role specified.",
                status: "error"
            })
        );
        return;
    }
    const currentUser = getState()?.auth?.user;
    if (!currentUser?.roles.includes('ADMIN')) {
      dispatch(
          notify({
              message: "You do not have access to assign a role to the user specified.",
              status: "error"
          })
      );
      return;
  }
    

    dispatch({ type: Types.ADD_ROLE_REQUEST });

    try {
        
        const userRef = doc(firestoreDb, "users", userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            throw new Error("User does not exist.");
        }

        const userData = userSnap.data();
        const userRoles = userData.roles || [];

        // Add role if it doesn't already exist
        if (!userRoles.includes(role)) {
            await updateDoc(userRef, {
                roles: arrayUnion(role)
            });
            dispatch({ type: Types.ADD_ROLE_SUCCESS, payload: { userId, role } });
            dispatch(
                notify({
                    message: `Role ${role} added successfully to user.`,
                    status: "success"
                })
            );
        } else {
            dispatch(
                notify({
                    message: `User already has the ${role} role.`,
                    status: "info"
                })
            );
        }
    } catch (error) {
        dispatch({ type: Types.ADD_ROLE_FAILURE, payload: error.message });
        dispatch(
            notify({
                message: `Failed to add role: ${error.message}`,
                status: "error"
            })
        );
    }
};

export const removeUserRole = (userId, role) => async (dispatch, getState) => {
  // Check if role is valid
  const roles = ['ADMIN', 'USER', 'SUPER_ADMIN', 'PATIENT', 'CAREGIVER'];
  if (!roles.includes(role)) {
      dispatch(
          notify({
              message: "Invalid role specified.",
              status: "error"
          })
      );
      return;
  }

  const currentUser = getState()?.auth?.user;
  if (!currentUser?.roles.includes('ADMIN')) {
      dispatch(
          notify({
              message: "You do not have access to remove a role from the specified user.",
              status: "error"
          })
      );
      return;
  }

  dispatch({ type: Types.REMOVE_ROLE_REQUEST });

  try {
      const userRef = doc(firestoreDb, "users", userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
          throw new Error("User does not exist.");
      }

      const userData = userSnap.data();
      const userRoles = userData.roles || [];

      // Remove role if it exists
      if (userRoles.includes(role)) {
          await updateDoc(userRef, {
              roles: arrayRemove(role)
          });
          dispatch({ type: Types.REMOVE_ROLE_SUCCESS, payload: { userId, role } });
          dispatch(
              notify({
                  message: `Role ${role} removed successfully from user.`,
                  status: "success"
              })
          );
      } else {
          dispatch(
              notify({
                  message: `User does not have the ${role} role.`,
                  status: "info"
              })
          );
      }
  } catch (error) {
      dispatch({ type: Types.REMOVE_ROLE_FAILURE, payload: error.message });
      dispatch(
          notify({
              message: `Failed to remove role: ${error.message}`,
              status: "error"
          })
      );
  }
};