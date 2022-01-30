import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

// source: https://codemoto.io/coding/react/react-delete-confirmation-modal
const AlertModal = ({ showModal, hideModal, message, confirmModal, type, id }) => {

	return (
		<Modal
			show={showModal}
			onHide={hideModal}
			backdrop="static"
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.Title>Delete Confirmation</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{message}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={hideModal}>
					Close
				</Button>
				<Button variant="danger" onClick={() => confirmModal(type, id)}>Confirm</Button>
			</Modal.Footer>
		</Modal>

	);
}

export default AlertModal;
