import React from 'react';

import { Modal, Button } from 'react-bootstrap';

const AlertTestSubmit = ({ confirmMessage, alert, setShowAlert, submitTest }) => {
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
			<Modal.Header closeButton>
				<Modal.Title>Confirmation</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{confirmMessage}
			</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={toggleSetAlert}>Cancel</Button>
                    <Button variant="danger" onClick={submitTest}>Confirm</Button>
                </Modal.Footer>
		</Modal>
    )
}

export default AlertTestSubmit;