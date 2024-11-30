import React, { useEffect, useState } from 'react';
import { Container, Sidebar, Sidenav, Content, Nav,Navbar, DOMHelper } from 'rsuite';
import { Outlet , NavLinkProps, NavLink as BaseNavLink } from 'react-router-dom';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import { withAuthorization } from '../Session';
import './index.css'
import FooterPage from '../Pages/Footer';
const { getHeight, on } = DOMHelper;

const NavToggle = ({ expand, onChange, width }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle" style={{width: width}}>
      <Nav pullRight>
        <Nav.Item
          onClick={onChange}
          style={{ textAlign: 'center' }}
          icon={expand ? <ArrowLeftLineIcon /> : <ArrowRightLineIcon />}
        />
      </Nav>
    </Navbar>
  );
};
const NavItem = (props) => {
  const { title, eventKey, ...rest } = props;
  return (
    <Nav.Item eventKey={eventKey} as={NavLink} {...rest}>
      {title}
    </Nav.Item>
  );
};

const NavLink = React.forwardRef(({ to, children, ...rest }, ref) => {
  return (
    <BaseNavLink ref={ref} to={to} {...rest}>
      {children}
    </BaseNavLink>
  );
});
const PatientFrame = (props) => {
  const { navs } = props;
  const [expand, setExpand] = useState(true);
  const [windowHeight, setWindowHeight] = useState(getHeight(window));
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
 
  const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  useEffect(() => {
      window.addEventListener('resize', handleResize);
          return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  useEffect(()=>{
      if(windowWidth <= 700){
        setExpand(false);
      }
       
      else{
        setExpand(true)
      }
  }, [windowWidth])
  useEffect(() => {
    setWindowHeight(getHeight(window));
    const resizeListener = on(window, 'resize', () => setWindowHeight(getHeight(window)));

    return () => {
      resizeListener.off();
    };
    
  }, []);
 
  const containerClasses = expand ? 'page-container' : 'page-container container-full';

  const navBodyStyle = expand
    ? { height: windowHeight - 112, overflowY: 'scroll' }
    : {};
  return (
    <Container className="frame">
      <Sidebar style={{ display: 'flex', flexDirection: 'column', position: 'fixed', zIndex: 1000}} width={expand ? 260 : 56} collapsible>
        <Sidenav expanded={expand} appearance="subtle" defaultOpenKeys={['2', '3']}>
          <Sidenav.Body style={navBodyStyle}>
            <Nav>
              {navs?.map((item) => {
                const { children, ...rest } = item;
                if (children) {
                  return (
                    <Nav.Menu key={item.eventKey} placement="rightStart" trigger="hover" {...rest}>
                      {children.map((child) => {
                        return <NavItem key={child.eventKey} {...child} />;
                      })}
                    </Nav.Menu>
                  );
                }

                if (rest.target === '_blank') {
                  return (
                    <Nav.Item key={item.eventKey} {...rest}>
                      {item.title}
                    </Nav.Item>
                  );
                }

                return <NavItem key={rest.eventKey} {...rest} />;
              })}
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <NavToggle expand={expand} onChange={() => setExpand(!expand)} width={expand ? 260 : 56}  />
      </Sidebar>

      <Container className={containerClasses}>
        <Content>
          <Outlet />
          <FooterPage />
         </Content>
      </Container>
    </Container>
  );
};
const condition = (authUser) =>authUser && (!!authUser?.roles?.includes('PATIENT'));

export default withAuthorization(condition)(PatientFrame);  