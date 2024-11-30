import React from 'react';
import Main from './Components/index';
import { Provider } from 'react-redux';
import { NotificationsProvider } from 'reapop';
import configureStore from './redux/configureStore';
import FirebaseContext from './Config/Firebase/context';
import { auth, firestoreDb , db } from './Config/Firebase/firebase';
import 'rsuite/dist/rsuite.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import {  CustomProvider } from 'rsuite';

const store = configureStore();

const App = () => {
  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
  <FirebaseContext.Provider value={[auth, firestoreDb, db]}>
    <NotificationsProvider>
      <CustomProvider theme='dark'>
 
        <Main />
       </CustomProvider>
    </NotificationsProvider>
  </FirebaseContext.Provider>    
  )
};

 
const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
