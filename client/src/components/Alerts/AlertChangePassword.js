import React from 'react';

import { useAuth, clearErrors } from '../../context/auth/AuthState';

import { Toast, Row, Col } from 'react-bootstrap';

const AlertChangePassword = ({ newPassword, confirmNewPassword, alert, setShowAlert }) => {
    const [authState, authDispatch] = useAuth();
    const { error } = authState;

    const toggleSetAlert = () => {
        setShowAlert(!alert);
        clearErrors(authDispatch);
    }

    return (
        <Row>
            <Col md={6} className="mb-2" style={{ 'left': '60%', 'position': 'fixed', 'transform': 'translate(-50%, 0px)', 'zIndex': '9999'}}>
                <Toast show={alert} onClose={toggleSetAlert} bg={error ? 'danger' : 'success'}>
                    <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">{error ? 'Error' : 'Success!'}</strong>
                    </Toast.Header>
                    {error ? (
                        <Toast.Body>{newPassword.toString() !== confirmNewPassword.toString() ? 'New paswords do not match!' : error}</Toast.Body>
                    ) : (
                        <Toast.Body>Password Updated!</Toast.Body>
                    )}
                </Toast>
            </Col>
        </Row>
    );
};

export default AlertChangePassword;
