import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { deleteUser, updateUser, useAuth, clearErrors, logout } from "../../context/auth/AuthState";
import AlertEditProfile from '../Alerts/AlertEditProfile';
import AlertModal from "../Alerts/AlertModal";
import { Navigate } from "react-router-dom";

function EditProfile() {
	const [authState, authDispatch] = useAuth();
	const { isAuthenticated, user, error } = authState;
	const [alert, setShowAlert] = useState(false);

	const [userData, setUserData] = useState({
		firstName: '',
		lastName: '',
		organization: '',
		email: ''
	});

	useEffect(() => {
		if (error) {
			setShowAlert(true);
		}
		if(user) {
			setUserData({
				firstName: isAuthenticated && user && user.firstName,
				lastName: isAuthenticated && user && user.lastName,
				organization: isAuthenticated && user && user.organization,
				email: isAuthenticated && user && user.email,
			});
		}
	}, [isAuthenticated, user, authDispatch, error]);

	const {
		firstName,
		lastName,
		organization,
		email,
	} = userData;


	const onChange = (event) => {
		setUserData({ ...userData, [event.target.name]: event.target.value });
		setShowAlert(false);
		clearErrors(authDispatch);
	};
	
	const onSubmit = (event) => {
		event.preventDefault();
		updateUser(authDispatch, userData);
		setShowAlert(true);
	};

	// delete modal
	const [type, setType] = useState('');
	const [id, setId] = useState();
	const [displayModal, setDisplayModal] = useState(false);
	const [deleteMessage, setDeleteMessage] = useState('');


	// source: https://codemoto.io/coding/react/react-delete-confirmation-modal
	const showModal = (type, id) => {
		setType(type);
		setId(id);
		if (type === "account") {
			setDeleteMessage("Deleting your account will also delete all saved quizzes and analysis. " +
				"Are you sure you want to delete your account?");
		}

		setDisplayModal(true);
	}

	const hideModal = () => {
		setDisplayModal(false);
	};

	const deleteAccount = () => {
		deleteUser(authDispatch, id);
		clearErrors(authDispatch);
		// alert("Your account has been successfully deleted.");
		// this would go to sign up page w/ errors and greeting as edit profile on top
		// if (LOGOUT) return <Navigate to="/register" />;
	};

	
	return (
		<Container className="w-75">
			<h1 className="my-5">Edit Profile</h1>
			<div className="w-75 p-3 my-3">
				<AlertEditProfile alert={alert} setShowAlert={setShowAlert} />
				<Form onSubmit={onSubmit}>
					<Row className="mb-3">
						<Form.Group as={Col} >
							<Form.Label htmlFor="firstName">First Name</Form.Label>
							<Form.Control 
								value={firstName}
								type="text"
								placeholder="Enter First Name"
								name="firstName"
								onChange={onChange}
							/>
						</Form.Group>

						<Form.Group as={Col} >
							<Form.Label htmlFor="lastName">Last Name</Form.Label>
							<Form.Control
								
								type="text"
								value={lastName}
								placeholder="Enter Last Name"
								name="lastName"
								onChange={onChange}
							/>
						</Form.Group>
					</Row>
					<Form.Group className="mb-3" >
						<Form.Label>Email</Form.Label>
						<Form.Control
						
							type="email"
							value={email}
							placeholder="Enter Email"
							name="email"
							onChange={onChange}
						/>
			
					</Form.Group>
					<Form.Group className="mb-3" >
						<Form.Label>Organization</Form.Label>
						<Form.Control
					
							type="text"
							value={organization}
							placeholder="Enter Organization"
							name="organization"
							onChange={onChange}
						/>
			
					</Form.Group>
					<Form.Group as={Col} >
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
				<a
					href="#"
					style={{ color: "red" }}
					onClick={() => showModal("account", user._id)}
				>
					Delete My Account
				</a>
				<AlertModal
					showModal={displayModal}
					confirmModal={deleteAccount}
					hideModal={hideModal}
					type={type}
					id={id}
					message={deleteMessage}
				/>
			</div>
		</Container>
	);
}

export default EditProfile;
