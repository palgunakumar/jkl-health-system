import { createBrowserHistory } from '@remix-run/router';
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
 import RouterComponent from './RouterComponent';
import { ParallaxProvider } from 'react-scroll-parallax';
import { withAuthentication, withAuthorization } from '../Session'
 
const Main = () => {
    
    const browserHistory = createBrowserHistory();
    return (
        <React.Fragment>
            <Router history={browserHistory}>  
                 <div>
                    {/* <ParallaxProvider> */}
                         <React.StrictMode>
                                 <RouterComponent />
                         </React.StrictMode>
                    {/* </ParallaxProvider> */}
                 </div>
            </Router>
         </React.Fragment>
    )
}

export default withAuthentication(Main);