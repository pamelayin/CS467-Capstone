import React from 'react';

import { Modal, Button } from 'react-bootstrap';

const AlertTestSubmit = ({ confirmMessage, alert, setShowAlert, submitTest, time }) => {
    const toggleSetAlert = () => {
        setShowAlert(!alert);
    }

    return (
        <Modal
			show={alert}
			onHide={toggleSetAlert}
			backdrop="static"
			keyboard={false}
            
		>
			<Modal.Header closeButton={time !== 0 ? true : false}>
				<Modal.Title>Confirmation</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{confirmMessage}
			</Modal.Body>
			<Modal.Footer>
				{time !== 0 ? (<Button variant="secondary" onClick={toggleSetAlert}>
					Close
				</Button>) : (<> </>)}
				
				<Button variant="danger" onClick={submitTest}>Confirm</Button>
			</Modal.Footer>
		</Modal>
    )
}

export default AlertTestSubmit