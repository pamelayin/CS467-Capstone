import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

function EditProfile() {
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} 
		setValidated(true);
		if (form.checkValidity() === true) {
			alert('Your profile has been updated.')
		}
	};
	return (
		<Container>
			<h1 className="my-5">Edit Profile</h1>
			<div className="w-75 p-3 my-3">
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Row className="mb-3">
						<Form.Group as={Col} controlId="formGridFirstName">
							<Form.Label>First Name</Form.Label>
							<Form.Control
								required
								type="text"
								defaultValue=""
								placeholder="Enter First Name"
							/>
							<Form.Control.Feedback type="invalid">
								Please provide a valid first name.
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridLastName">
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								required
								type="text"
								defaultValue=""
								placeholder="Enter Last Name"
							/>
							<Form.Control.Feedback type="invalid">
								Please provide a valid last name.
							</Form.Control.Feedback>
						</Form.Group>
					</Row>
					<Form.Group className="mb-3" controlId="formGridEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control
							required
							type="email"
							defaultValue=""
							placeholder="Enter Email"
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a valid email address.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formGridOrganization">
						<Form.Label>Organization</Form.Label>
						<Form.Control
							required
							type="text"
							defaultValue=""
							placeholder="Enter Organization"
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a valid organization name.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridSubmit">
						<div className="text-center">
							<Button className="mx-5 my-3" variant="primary" type="submit">
								Submit
							</Button>
							<Button variant="outline-primary" type="submit">
								Cancel
							</Button>
						</div>
					</Form.Group>
				</Form>
			</div>
		</Container>
	);
}

export default EditProfile;
