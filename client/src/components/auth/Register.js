import React, { useState, useEffect, Fragment } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth, registerUser, clearErrors } from '../../context/auth/AuthState';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const Register = props => {
    const [authState, authDispatch] = useAuth();
    const { error, isAuthenticated } = authState;

    useEffect(() => {
        if(error === 'User already exists') {
            alert(error);
            clearErrors(authDispatch);
        }
    }, [error, isAuthenticated, props.history, authDispatch]);

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        organization: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { firstName, lastName, organization, email, password, confirmPassword } = user;

    const onChange = event => setUser({ ...user, [event.target.name]: event.target.value });

    const onSubmit = event => {
        event.preventDefault();

        if(firstName === '' || lastName === '' || organization === '' || email === '' || password === '') {
            alert('Please fill out each field appropriately!');
        } else if(confirmPassword.toString() !== password.toString()) {
            alert('Passwords do not match!');
        } else {
            registerUser(authDispatch, {
                firstName,
                lastName,
                organization,
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
                        <h1 className='shadow-sm text-primary p-3 text-center rounded'>Sign Up</h1>
                        <Form onSubmit={onSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor='firstName'>First Name</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='firstName' 
                                    placeholder='First Name' 
                                    value={firstName} 
                                    onChange={onChange}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor='lastName'>Last Name</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='lastName' 
                                    placeholder='Last Name' 
                                    value={lastName} 
                                    onChange={onChange}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor='Organization'>Organization</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='organization' 
                                    placeholder='Organization' 
                                    value={organization} 
                                    onChange={onChange}
                                    />
                            </Form.Group>
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
                            <Form.Group>
                                <Form.Label htmlFor='confirmPassword'>Confirm Password</Form.Label>
                                <Form.Control 
                                    type='password'
                                    name='confirmPassword'
                                    placeholder='Confirm Password'
                                    value={confirmPassword}
                                    onChange={onChange}
                                />
                            </Form.Group>
                            <Button variant='primary btn-block' type='submit' style={{ 'marginTop': '2rem'}}>Sign Up</Button>
                            <div style={{ 'marginTop': '0.5rem'}}>
                                <Link to='/login'>Already a Member?</Link>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
        // <div className='container h-100 border solid black 1px' style={{ padding: '1rem' }}>
        //     <div className='row h-100 justify-content-center'>
        //         <form className='col-12' onSubmit={onSubmit}>
        //             <div className="form-group">
        //                 <label htmlFor="firstName">First Name</label>
        //                 <input type="text" className='form-control' name='firstName' placeholder='First Name' value={firstName} onChange={onChange} />
        //             </div>
        //             <div className="form-group">
        //                 <label htmlFor="lastName">Last Name</label>
        //                 <input type="text" className="form-control" name="lastName" placeholder='Last Name' value={lastName} onChange={onChange} />
        //             </div>
        //             <div className="form-group">
        //                 <label htmlFor="organization">Organization</label>
        //                 <input type="text" className="form-control" name="organization" placeholder='Organization' value={organization} onChange={onChange} />
        //             </div>
        //             <div className="form-group">
        //                 <label htmlFor="email">Email</label>
        //                 <input type="email" className="form-control" name="email" placeholder="Email" value={email} onChange={onChange} />
        //             </div>
        //             <div className="form-group">
        //                 <label htmlFor='password'>Password</label>
        //                 <input type="password" className="form-control" name='password' placeholder="Password" value={password} onChange={onChange} />
        //             </div>
        //             <div className="form-group">
        //                 <label htmlFor="confirmPassword">Confirm Password</label>
        //                 <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={onChange} />
        //             </div>
        //             <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Register</button>
        //         </form>
        //     </div>
        // </div>
    )
}

export default Register
