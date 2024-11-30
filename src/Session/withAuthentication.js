import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { withFirebase } from '../Config/Firebase';
import { auth } from '../Config/Firebase/firebase';
import { getCurrentUserData } from '../redux/auth';

const withAuthentication = (Component) => {
  const WithAuthentication = (props) => {
    useEffect(() => {
      const onAuthStateChangedListener = onAuthStateChanged(
        auth,
        (authUser) => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          if (authUser) {
            props.getUserData(authUser.uid);
          }
        },
        (error) => {
          console.error('Authentication error:', error);
          localStorage.removeItem('authUser');
          props.onSetAuthUser(null);
        }
      );

      return () => {
        onAuthStateChangedListener(); // Unsubscribe when component unmounts
      };
    }, []); // Empty dependency array

    return <Component {...props} />;
  };

  const mapDispatchToProps = (dispatch) => ({
    getUserData: (userId) => dispatch(getCurrentUserData(userId)),
  });

  return withFirebase(connect(null, mapDispatchToProps)(WithAuthentication));
};


export default withAuthentication;
