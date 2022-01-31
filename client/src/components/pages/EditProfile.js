import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { deleteUser, updateUser, useAuth, clearErrors } from "../../context/auth/AuthState";
import AlertEditProfile from '../Alerts/AlertEditProfile';
import AlertModal from "../Alerts/AlertModal";
import { LOGOUT, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL } from "../../context/types";

function EditProfile() {
	const [authState, authDispatch] = useAuth();
	const { isAuthenticated, user, error} = authState;
	const [alert, setShowAlert] = useState(false);

	const [userData, setUserData] = useState({
		firstName: '',
		lastName: '',
		organization: '',
		email: ''
	});

	useEffect(() => {
		setUserData({
			firstName: isAuthenticated && user && user.firstName,
			lastName: isAuthenticated && user && user.lastName,
			organization: isAuthenticated && user && user.organization,
			email: isAuthenticated && user && user.email,
		});
	}, [isAuthenticated, user, authDispatch]);


	useEffect(() => {
		if (UPDATE_USER_FAIL) {
			console.log(UPDATE_USER_FAIL.payload);
			setShowAlert(true);
			
		}
	}, [error, isAuthenticated, authDispatch]);
	// const findErrors(() => {
	// 	const alphaReg = /^[a-zA-Z]+$/;
	// 	const { firstName, lastName, email, organization } = form
	// 	const newErrors = {}
	// 	if (!firstName || firstName === '') newErrors.firstName = 'First name cannot be blank.'
	// 	else if (firstName.length < 1 || firstName.length > 30) newErrors.firstName = 'First name must be between 1 and 30 characters long.'
	// 	else if (!alphaReg.test(firstName)) newErrors.firstName
	// });

	const {
		firstName,
		lastName,
		organization,
		email,
	} = userData;


	const onChange = (event) => {
		setUserData({ ...userData, [event.target.name]: event.target.value });
		console.log(userData)
		setShowAlert(false);
		clearErrors(authDispatch);
	};
	
	const onSubmit = (event) => {

		event.preventDefault();

		updateUser(authDispatch, userData, user._id);
		if (UPDATE_USER_FAIL) {
			console.log(error);
			setShowAlert(true);
		} 

		// if (UPDATE_USER) return <Navigate to="/account" />
		
	};
	// delete modal
	const [type, setType] = useState();
	const [id, setId] = useState();
	const [displayModal, setDisplayModal] = useState(false);
	const [deleteMessage, setDeleteMessage] = useState();


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
		alert("Your account has been successfully deleted.");
		// this would go to sign up page w/ errors and greeting as edit profile on top
		// if (LOGOUT) return <Navigate to="/register" />;
	};

	
	return (
		<Container className="w-75">
			<h1 className="my-5">Edit Profile</h1>
			<div className="w-75 p-3 my-3">
				<AlertEditProfile user={userData} alert={alert} setShowAlert={setShowAlert} />
				<Form onSubmit={onSubmit}>
					<Row className="mb-3">
						<Form.Group as={Col} >
							<Form.Label>First Name</Form.Label>
							<Form.Control 
						
								type="text"
								defaultValue={firstName}
								placeholder="Enter First Name"
								name="firstName"
								onChange={onChange}
							/>
						</Form.Group>

						<Form.Group as={Col} >
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								
								type="text"
								defaultValue={lastName}
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
							defaultValue={email}
							placeholder="Enter Email"
							name="email"
							onChange={onChange}
						/>
			
					</Form.Group>
					<Form.Group className="mb-3" >
						<Form.Label>Organization</Form.Label>
						<Form.Control
					
							type="text"
							defaultValue={organization}
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
