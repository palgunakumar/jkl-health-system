import React from "react";
import { Container, Content,  Header } from "rsuite";
 import NavBarComponent from "./NavBarComponent";
 import Loading from "./Loading/loading";
 import { getApp } from "./Routes/helpers";
import FooterPage from "../Pages/Footer";
import { useLocation } from 'react-router-dom';

const AppRoutes = () => {
    const CurrentApp = getApp();
    const location = useLocation();
    const path = location.pathname;

    // Define routes that have a sidebar
const routesWithSidebar = ['/admin', '/patients', '/caregiver'];

    // Check if the current route is one of the routes with a sidebar
    const hasSidebar = routesWithSidebar.some(route => path.startsWith(route));
    return(
        <React.Suspense fallback={<Loading />}>
                     

      <Container>           
        <Header>
            <NavBarComponent />
         </Header>          
            <Content style={{ paddingTop: '60px', top: '40px' }}>
                <CurrentApp />
            </Content>
      </Container>
      {!hasSidebar &&  <FooterPage/> }
    </React.Suspense>
    )
}
export default AppRoutes;