import React, { useState } from "react";
import {Nav, Tab, Row, Col, Container, Form, Button} from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validator from 'validator'
import AlertModal from "../Alerts/AlertModal";
import { useAuth } from "../../context/auth/AuthState";

function QuizSend() {
    	
	// alert modal
	const [displayModal, setDisplayModal] = useState(false);
	const [deleteMessage, setDeleteMessage] = useState();

    const showModal = () => {
        if (eAddress.emailText.length > 0) {
            setDeleteMessage(
                "Are you sure you want to cancel? You will lose all data you have entered."
            );
            setDisplayModal(true);
        } else {
            navigate("/quizlist");
        }
	};

	const hideModal = () => {
		setDisplayModal(false);
	};

	const onConfirm = () => {
        hideModal();
        navigate("/quizlist");
    };
    
    const [authState] = useAuth();
    const { isAuthenticated, user } = authState;

	//collect all email addresses as a single string
	const [eAddress, setEmail] = useState({
		emailText: "",
	});

	const [eAddresses, setState] = useState([]);
	const navigate = useNavigate();

	function getEmail(event) {
		const { name, value } = event.target;
		setEmail({
			[name]: value,
		});
	}

	function onSubmit(event) {
		event.preventDefault();
		let emailList = eAddress.emailText.split(","); //email into array

		let emailSubject = "You are invited to take a quiz"; //set subject and context
		let emailContext = "Test email"; //we can modify the text later

		if (emailList[0] == "") {
			alert("Please enter at least one email address");
        } else {
            // This is to send email to employer 
            emailList[emailList.length] = user.email
            for (let i = 0; i < emailList.length; i++) {
				//axios to send data to backend to send out emails
				if (validator.isEmail(emailList[i])) {
					//if the email is true, send out email
					axios({
						method: "POST",
						url: "http://localhost:7000/send", //we might need to change url for actual url for backend
						data: {
							name: emailSubject, //set data
							email: emailList[i],
							messageHtml: emailContext,
						},
					}).then((response) => {
						// sending result
						if (response.data.msg === "success") {
							//alert("Email sent, awesome!");            //since looping, it is annoying
						} else if (response.data.msg === "fail") {
							alert(`Oops, something went wrong with ${emailList[i]}.`);
						}
					});
				} else {
					alert(`${emailList[i]} is not a valid email. Quiz will not be sent to this address.`);
				}
			}
		}
	}

	// function backToDash() {
	// 	let text = "If you click 'OK', you will lose all your data.";
	// 	if (window.confirm(text) === true) {
	// 		navigate("/quizlist");
	// 	}
	// }

	return (
		<div>
			<Container
				style={{ marginTop: 70, marginBottom: 15, textAlign: "center" }}
			>
				<span className="mb-0 h3">Send out your quiz</span> <br />
				<br />
				<p>
					Provide an email address you want to send out. {<br />} In case of
					multiple email address, please separate with ',' symbol.{" "}
				</p>
				<div style={{ width: "50%", margin: "auto" }}>
					<Form>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1"
						>
							<Form.Control
								as="textarea"
								rows={6}
								name="emailText"
								value={eAddress.emailText}
								onChange={getEmail}
							/>
						</Form.Group>
						<Button
							variant="danger"
							className="mx-3"
							onClick={showModal}
						>
							Cancel
						</Button>{" "}
						<Button variant="warning" onClick={onSubmit}>
							Send
						</Button>
					</Form>
				</div>
			</Container>
			<AlertModal
				showModal={displayModal}
				confirmModal={onConfirm}
				hideModal={hideModal}
				message={deleteMessage}
			/>
		</div>
	);
}
export default QuizSend;
