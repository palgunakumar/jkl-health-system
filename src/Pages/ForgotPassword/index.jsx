import React, { useRef, useState } from 'react';
import { Form, Button, Panel, Row, Col, Grid, Stack, Divider, Schema, FlexboxGrid } from 'rsuite';
import { Link } from 'react-router-dom';
  import GoogleIcon from '@rsuite/icons/legacy/Google';
import { useDispatch } from 'react-redux';
import { doSendPasswordResetEmail, loginUser, loginWithGoogle } from '../../redux/auth';
 
const { StringType } = Schema.Types;

const model = Schema.Model({
  email: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('Email is required.'),
   
});

const ForgotPassword = () => {
  const formRef = useRef();
  const [formValue, setFormValue] = useState({ email: ''});
  const [formError, setFormError] = useState({});
const dispatch = useDispatch();
  const handleSubmit = () => {
    if (!formRef.current.check()) {
      return;
    }
    // Handle successful form submission here
    dispatch(doSendPasswordResetEmail(formValue.email));
   };
 
  return (
    <FlexboxGrid justify="center" align='center' style={{ marginTop: '11%', marginBottom: '7%' }}>
    <FlexboxGrid.Item colspan={24}>
        <Grid fluid style={{float: 'none'}}>
            <Row>
                <Col md={8} mdOffset={8} lg={8} lgOffset={8} sm={14} smOffset={5} xs={22} xsOffset={1}>

      <Panel bordered   header={<h3 style={{textAlign: 'center'}}>Recover Account</h3>}>
        <p style={{ marginBottom: 10,  marginTop: 30  }}>
          <span className="text-muted">Not registered yet? </span>{' '}
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
            <Stack spacing={6} divider={<Divider vertical />} justifyContent='flex-end'>
              <Button appearance="primary" onClick={handleSubmit}>
                Recover account
              </Button>
 
            </Stack>
          </Form.Group>
        </Form>
      </Panel>
      </Col>
                                </Row>
                            </Grid>
                            
                        </FlexboxGrid.Item>
                         
                    </FlexboxGrid>
  );
};

export default ForgotPassword;
