import React, { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth, logout } from '../../context/auth/AuthState';

import { Nav, Navbar, Container } from 'react-bootstrap';

//https://www.codegrepper.com/code-examples/html/horizontal+line+html+react
const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 4,
            marginTop: 0
        }}
    />
);

const Navigation = ({greeting}) => {
    const [authState, authDispatch] = useAuth();
    const { isAuthenticated, user } = authState;

    const onLogout = () => {
        logout(authDispatch);
    };

    return (
        <div>         
            <Navbar>
                <Container className="justify-content-end" style={{paddingRight:'2%', marginBottom:-10}}>
                    <img src = {require("../../assets/logo_small_two.png")}/>
                </Container>
            </Navbar>
            <Navbar style = {{paddingBottom:0}}>
                <Container>
                <Navbar.Brand style={{ 'padding': '0.3rem', 'fontSize': '1.4rem' }}> {greeting} {isAuthenticated && user && user.firstName} {isAuthenticated && user && user.lastName}</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text style={{paddingRight:20}}>
                            <span className='navFont'>
                                <Nav.Link href="/">Dashboard</Nav.Link>
                            </span>
                        </Navbar.Text>
                        <Navbar.Text>
                            <span className='navFont'>
                                <Nav.Link onClick={onLogout} to='/login'>Logout</Nav.Link>
                            </span>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>
                <ColoredLine color = "#FFC300"/>
            </div>
            <Outlet />         
        </div>
    )
};

export default Navigation;