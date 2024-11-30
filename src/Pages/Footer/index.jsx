import React from 'react'
 import { Nav, Navbar, Footer, Stack, IconButton, Button } from 'rsuite';
import FacebookSquareIcon from '@rsuite/icons/legacy/FacebookSquare';
import GithubSquare from '@rsuite/icons/legacy/GithubSquare';
import LinkedInSquare from '@rsuite/icons/legacy/LinkedinSquare';
import Instagram from '@rsuite/icons/legacy/Instagram';
 import { Link } from 'react-router-dom';

const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest} >
    {children}
  </Link>
));
function FooterPage() {
  return (
    <Footer>
      <div style={{ margin: '2% 2% 2% 2%', textAlign: 'center' }}>
        <hr></hr>
        <div>
          <Stack justifyContent='space-around' alignItems='center' wrap>
            <Stack.Item>
              <span>Developed by<Button appearance='link' href="https://github.com/palgunakumar">@palgunakumar</Button></span>
            </Stack.Item>
            <Stack.Item>
              <div style={{ textAlign: 'center' }}>
                &copy; {new Date().getFullYear()} JKL Healthcare Services | All rights reserved. All rights reserved.
              </div>
              <div>
                <Link to={'/privacy-policy'}>Privacy Policy</Link>
              </div>
            </Stack.Item>

            <Stack justifyContent='space-around'>
              <NavLink href="https://facebook.com/"   >
                <FacebookSquareIcon style={{ width: '40px', height: '40px' }} />
              </NavLink>
              <NavLink href="https://www.linkedin.com/in/palguna-kumar-reddy-ekambaram-67b486201/"  >
                <LinkedInSquare style={{ width: '40px', height: '40px' }} />
              </NavLink>
              <NavLink href="https://github.com/palgunakumar" >
                <GithubSquare style={{ width: '40px', height: '40px' }} />
              </NavLink>
              <NavLink href="https://instagram.com/urs_palgunakumar" >
                <Instagram style={{ width: '40px', height: '40px' }} />
              </NavLink>
            </Stack>
          </Stack>
        </div>
      </div>
    </Footer>
  );
}

export default FooterPage;

 