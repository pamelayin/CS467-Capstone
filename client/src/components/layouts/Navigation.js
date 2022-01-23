import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, logout } from '../../context/auth/AuthState';

import { Nav, Navbar, Container } from 'react-bootstrap';

const Navigation = () => {
    const [authState, authDispatch] = useAuth();
    const { isAuthenticated, user } = authState;

    const onLogout = () => {
        logout(authDispatch);
    };

    return (
        <Container>
            <Navbar collapseOnSelect bg="primary" variant="dark" expand='lg' fixed='top'>
                <Navbar.Brand style={{ 'padding': '0.3rem', 'fontSize': '1.4rem' }}>Welcome {isAuthenticated && user && user.firstName} {isAuthenticated && user && user.lastName}</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='ms-auto' style={{ 'fontSize': '1.4rem' }}>
                        <Nav.Link onClick={onLogout} to='/login'>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    )
};

export default Navigation;
