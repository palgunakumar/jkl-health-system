import React from 'react';
import { connect, useDispatch, useSelector } from "react-redux";

import { withFirebase } from '../Config/Firebase';
import { doSendEmailVerification } from '../redux/auth';
const needsEmailVerification = (authUser) =>
  authUser &&
  !authUser.emailVerified
const withEmailVerification = Component => {
  const WithEmailVerification = () => {
    const authUser = useSelector(state => state.authState.currentUser);
    const isEmailVerificationSent = useSelector(state => state.authState.isEmailVerificationSent)
    const dispatch = useDispatch();
    const onSendEmailVerification = () => {
        dispatch(doSendEmailVerification());
    };
      return (needsEmailVerification(authUser) ? (
        <div className='container'>
          {isEmailVerificationSent ? (
            <p>
              E-Mail confirmation sent: Check you E-Mails (Spam folder
              included) for a confirmation E-Mail. Refresh this page
              once you confirmed your E-Mail.
            </p>
          ) : (
            <p>
              Verify your E-Mail: Check you E-Mails (Spam folder
              included) for a confirmation E-Mail or send another
              confirmation E-Mail.
            </p>
          )}

          <button
            type="button"
            onClick={onSendEmailVerification}
            disabled={isEmailVerificationSent}
          >
            Send confirmation E-Mail
          </button>
        </div>
      ) : (
        <Component  />
      )
      );      
  }

  const mapStateToProps = state => ({
    authUser: state.authState.currentUser,
    isEmailVerificationSent: state.authState.isEmailVerificationSent
  });

  const withfirebase = withFirebase(withEmailVerification);

  return connect(mapStateToProps)(withfirebase);
};

export default withEmailVerification;
