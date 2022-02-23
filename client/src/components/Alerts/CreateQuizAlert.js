import React from 'react';

import { Toast, Row, Col } from 'react-bootstrap';

const CreateQuizAlert = ({ error, alert, setShowAlert }) => {

    const toggleSetAlert = () => {
        setShowAlert(!alert);
    }

    return (
        <Row>
            <Col md={6} className="mb-2" style={{ 'left': '61%', 'position': 'fixed', 'transform': 'translate(-50%, 0px)', 'zIndex': '9999'}}>
                <Toast show={alert} onClose={toggleSetAlert} bg={error ? 'danger' : 'success'}>
                    <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">{error ? 'Error' : 'Success'}</strong>
                    </Toast.Header>
                    {error ? ( <Toast.Body>{error}</Toast.Body> ) 
                    : (
                        <Toast.Body>
                            You have successfully created your quiz! You will now be redirected back to your dashboard. You can find your quiz in past quizzes.
                        </Toast.Body>
                    )}
                </Toast>
            </Col>
        </Row>
    );
};

export default CreateQuizAlert;
