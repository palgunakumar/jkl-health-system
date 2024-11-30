import React, { useRef, useState } from 'react';
import { Form, Button, Panel, InputGroup, Stack, Checkbox, Divider, Schema, FlexboxGrid, Col, Row, Grid } from 'rsuite';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../redux/auth';

const { StringType, BooleanType } = Schema.Types;

const initialValues = {
    email: '',
    username: '',
    password: '',
    confirm_password: '',
    agree: false
};

const model = Schema.Model({
    email: StringType().isEmail('Please enter a valid email').isRequired('Email is required'),
    username: StringType().isRequired('Username is required'),
    password: StringType()
        .minLength(8, 'Password must be at least 8 characters long')
        .addRule(value => /[A-Z]/.test(value), 'Password must contain at least one uppercase letter')
        .addRule(value => /[a-z]/.test(value), 'Password must contain at least one lowercase letter')
        .addRule(value => /\d/.test(value), 'Password must contain at least one number')
        .addRule(value => /[!@#$%^&*(),.?":{}|<>]/.test(value), 'Password must contain at least one special character')
        .isRequired('Password is required'),
    confirm_password: StringType()
        .addRule((value, data) => value === data.password, 'Two passwords do not match')
        .isRequired('Confirm Password is required'),
 });

const SignIn = () => {
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
    const formRef = useRef();
    const [formValue, setFormValue] = useState(initialValues);
    const [formError, setFormError] = useState();
    const dispatch = useDispatch();
    const handleSubmit = () => {
        if (!formRef.current.check()) {
            return;
        }
        if(!formValue.agree){
            setFormError({...formError, agree: 'Please agree with the privacy policy'})
            return
        }
        dispatch(signupUser(formValue))
         setFormValue(initialValues);
    };     
    return (
        <FlexboxGrid justify="center" align='center' style={{ marginTop: '5%', marginBottom: '6%' }}>
    <FlexboxGrid.Item colspan={24}>
        <Grid fluid style={{float: 'none'}}>
            <Row>
                <Col md={8} mdOffset={8} lg={8} lgOffset={8} sm={14} smOffset={5} xs={22} xsOffset={1}>

             <Panel header={<h3>Create an Account</h3>} bordered  >
                <p>
                    <span>Already have an account?</span> <Link to="/login">Sign in here</Link>
                </p>

                <Divider>OR</Divider>

                <Form
                    fluid
                    ref={formRef}
                    onChange={setFormValue}
                    onCheck={setFormError}
                    formValue={formValue}
                    model={model}
                >
                    <Form.Group>
                        <Form.ControlLabel>Username</Form.ControlLabel>
                        <Form.Control name="username" />
                        <Form.ErrorMessage name="username" />
                    </Form.Group>

                    <Form.Group>
                        <Form.ControlLabel>Email</Form.ControlLabel>
                        <Form.Control name="email" />
                        <Form.ErrorMessage name="email" />
                    </Form.Group>

                    <Form.Group>
                        <Form.ControlLabel>Password</Form.ControlLabel>
                        <InputGroup inside style={{ width: '100%' }}>
                            <Form.Control
                                name="password"
                                type={visiblePassword ? 'text' : 'password'}
                                autoComplete="off"
                            />
                            <InputGroup.Button onClick={() => setVisiblePassword(!visiblePassword)}>
                                {visiblePassword ? <EyeIcon /> : <EyeSlashIcon />}
                            </InputGroup.Button>
                        </InputGroup>
                        <Form.ErrorMessage name="password" />
                    </Form.Group>

                    <Form.Group>
                        <Form.ControlLabel>Confirm Password</Form.ControlLabel>
                        <InputGroup inside style={{ width: '100%' }}>
                            <Form.Control
                                name="confirm_password"
                                type={visibleConfirmPassword ? 'text' : 'password'}
                            />
                            <InputGroup.Button onClick={() => setVisibleConfirmPassword(!visibleConfirmPassword)}>
                                {visibleConfirmPassword ? <EyeIcon /> : <EyeSlashIcon />}
                            </InputGroup.Button>
                        </InputGroup>
                        <Form.ErrorMessage name="confirm_password" />
                    </Form.Group>

                    <Form.Group>
                        <Stack style={{ marginLeft: -10 }}>
                            <Form.Control
                                name="agree"
                                onChange={(value, checked) => setFormValue({...formValue, agree : checked})}
                                accepter={Checkbox}
                            >
                                I Agree
                            </Form.Control>
                            <Button appearance="link">Terms and conditions.</Button>
                        </Stack>
                        {formError && formError.agree && (
                            <p style={{ color: 'red' }}>{formError.agree}</p>
                        )} 
                     </Form.Group>

                    <Form.Group>
                        <Stack spacing={6} justifyContent="flex-end">
                            <Button appearance="primary" onClick={handleSubmit}>
                                Submit
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

export default SignIn;
