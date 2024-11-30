import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { userRef, auth} from '../Config/Firebase/firebase';
import { getDoc } from 'firebase/firestore';
import Loading from '../Components/Loading/loading';
import { withNavigation } from './withNavigation';
 
const withAuthorization = condition => Component => {
  const WithAuthorization = (props) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const authUser = await new Promise((resolve, reject) => {
          onAuthStateChanged(auth, (user) => {
            resolve(user);
          }, reject);
        });

        if (authUser) {
          const uid = authUser.uid;
          const snapshot = await getDoc(userRef(uid));
          const dbUser = snapshot.data();

          // default empty roles
          if (dbUser && dbUser.roles === undefined) {
            dbUser.roles = [];
          }

          // merge auth and db user
          const mergedUser = {
            uid: authUser.uid,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            roles: [ ...dbUser.roles ],
            ...authUser
          };

          setCurrentUser(mergedUser);

          if (!condition(mergedUser)) {
            props.navigate('/error-403');
          }
        } else {
          props.navigate('/login');
        }
      };

      fetchData();

      return () => {
        // Cleanup code here
      };
    }, []);

    return currentUser ? <Component {...props} /> : <Loading />;
  };

  return withNavigation(WithAuthorization);
};

export default withAuthorization;