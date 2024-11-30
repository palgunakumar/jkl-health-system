import React, { useRef, useState } from 'react';
import { Form, Button, Panel, IconButton, Stack, Divider, Schema, FlexboxGrid, Row, Col, Grid } from 'rsuite';
import { Link } from 'react-router-dom';
  import GoogleIcon from '@rsuite/icons/legacy/Google';
import { useDispatch } from 'react-redux';
import { loginUser, loginWithGoogle } from '../../redux/auth';
 
const { StringType } = Schema.Types;

const model = Schema.Model({
  email: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('Email is required.'),
  password: StringType()
    .minLength(8, 'Password must be at least 8 characters.')
    .isRequired('Password is required.')
});

const SignUp = () => {
  const formRef = useRef();
  const [formValue, setFormValue] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState({});
const dispatch = useDispatch();
  const handleSubmit = () => {
    if (!formRef.current.check()) {
      return;
    }
    // Handle successful form submission here
    dispatch(loginUser(formValue.email, formValue.password));
    console.log('Form submitted successfully', formValue);
  };
  const handleLoginWithGoogle = () => {
    dispatch(loginWithGoogle())
  }
  return (
    <>
    <FlexboxGrid justify="center" align='center' style={{ marginTop: '9%', marginBottom: '6%' }}>
    <FlexboxGrid.Item colspan={24}>
        <Grid fluid style={{float: 'none'}}>
            <Row>
                <Col md={10} mdOffset={7} lg={10} lgOffset={7} sm={14} smOffset={5} xs={22} xsOffset={1}>

      <Panel bordered   header={<h3>Sign In</h3>}>
        <p style={{ marginBottom: 10 }}>
          <span className="text-muted">New Here? </span>{' '}
          <Link to="/register">Create an Account</Link>
        </p>

        <Form
          fluid
          ref={formRef}
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
        >
          <Form.Group>
            <Form.ControlLabel>Email Address</Form.ControlLabel>
            <Form.Control name="email" />
            <Form.ErrorMessage name="email" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>
              <span>Password</span>
              <Link to={'/forgot-password'} style={{ float: 'right' }}>Forgot password?</Link>
            </Form.ControlLabel>
            <Form.Control name="password" type="password" />
            <Form.ErrorMessage name="password" />
          </Form.Group>

          <Form.Group>
            <Stack spacing={6} divider={<Divider vertical />}>
              <Button appearance="primary" onClick={handleSubmit}>
                Sign in
              </Button>
              <Stack spacing={6}>
                <IconButton onClick={handleLoginWithGoogle} icon={<GoogleIcon />} appearance="subtle" />
              </Stack>
            </Stack>
          </Form.Group>
        </Form>
      </Panel>
      </Col>
                                </Row>
                            </Grid>
                            
                        </FlexboxGrid.Item>
                         
                    </FlexboxGrid>
    </>
  );
};

export default SignUp;
