import React, { useState, useEffect, Fragment } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth, loginUser, clearErrors } from '../../context/auth/AuthState';

import { Form, Container, Row, Col, Button } from 'react-bootstrap';

const Login = () => {
    const [authState, authDispatch] = useAuth();
    const { error, isAuthenticated } = authState;

    useEffect(() => {
        if(error === 'Invalid Credentials') {
            alert(error);
            clearErrors(authDispatch);
        }
    }, [error, isAuthenticated, authDispatch]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    let { email, password } = user;
    
    const onChange = event => setUser({ ...user, [event.target.name]: event.target.value });

    const onSubmit = event => {
        event.preventDefault();
        if(email === '' || password === '') {
            alert('Please fill in all fields appropriately')
        } else {
            loginUser(authDispatch, {
                email,
                password
            });
        }
    }

    if(isAuthenticated) return <Navigate to='/' />;

    return (
        <Fragment>
            <Container>
                <h1 className='shadow-sm text-primary p-3 text-center rounded'>Quiz Banana</h1>
                <Row className='mt-5'>
                    <Col lg={5} md={6} sm={12} className='p-5 m-auto shadow-sm rounded-lg'>
                        <h1 className='shadow-sm text-primary p-3 text-center rounded'>Login</h1>
                        <Form onSubmit={onSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor='email'>Email Address</Form.Label>
                                <Form.Control 
                                    type='email' 
                                    name='email' 
                                    placeholder='Email' 
                                    value={email} 
                                    onChange={onChange}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor='password'>Password</Form.Label>
                                <Form.Control 
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={onChange}
                                />
                            </Form.Group>
                            <Button variant='primary btn-block' type='submit' style={{ 'marginTop': '2rem'}}>Login</Button>
                            <div style={{ 'marginTop': '0.5rem'}}>
                                <Link to='/register'>Not Signed Up Yet?</Link>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Login
