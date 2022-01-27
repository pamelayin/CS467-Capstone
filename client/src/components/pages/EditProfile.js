import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useAuth } from "../../context/auth/AuthState";

function EditProfile() {
	const [authState] = useAuth();
	const { isAuthenticated, user } = authState;
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
		<Container className="w-75">
			<h1 className="my-5">Edit Profile</h1>
			<div className="w-75 p-3 my-3">
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Row className="mb-3">
						<Form.Group as={Col} controlId="formGridFirstName">
							<Form.Label>First Name</Form.Label>
							<Form.Control
								required
								type="text"
								defaultValue={isAuthenticated && user && user.firstName}
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
								defaultValue={isAuthenticated && user && user.lastName}
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
							defaultValue={isAuthenticated && user && user.email}
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
							defaultValue={isAuthenticated && user && user.organization}
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
							<a
								className="btn btn-outline-primary"
								href="/account"
								role="button"
							>
								Cancel
							</a>
						</div>
					</Form.Group>
				</Form>
				<a href="/delete" style={{ color: "red" }}>Delete My Account</a>
			</div>
		</Container>
	);
}

export default EditProfile;
