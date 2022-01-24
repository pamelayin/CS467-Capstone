import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

function ManageAccount() {
	const [id, setId] = useState("");
	// useEffect(
	// 	function () {
	// 		axios.get("https://localhost:7000/api/auth")
	// 			.then((res) => {
	// 				console.log(res.data);
	// 			})
	// 			.catch((err) => {
	// 				console.log(err.message);
	// 		})
	// 	}
	// )
	return (
		<Container>
			<h1 className="my-5">Your Account</h1>
			<Row>
				<Col xs={12} md={6}>
					<Card border="warning" className="mx-auto my-3">
						<Card.Body>
							<Card.Title>
								<Row className="mx-auto my-3">
									<Col xs={12} md={4}>
										Full Name
									</Col>
									<Col xs={12} md={8}>
										John Doe
									</Col>
								</Row>

								<Row className="mx-auto my-3">
									<Col xs={12} md={4}>
										Organization
									</Col>
									<Col xs={12} md={8}>
										Team QuizBanana
									</Col>
								</Row>
							</Card.Title>
							<Card.Link style={{ float: "right" }} href="#">
								Update Profile
							</Card.Link>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={12} md={6}>
					<Card border="warning" className="mx-auto my-3">
						<Card.Body>
							<Card.Title>
								<Row className="mx-auto my-3">
									<Col xs={12} md={4}>
										Email
									</Col>
									<Col xs={12} md={8}>
										banana@quizbanana.com
									</Col>
								</Row>

								<Row className="mx-auto my-3">
									<Col xs={12} md={4}>
										Password
									</Col>
									<Col xs={12} md={8}>
										***********
									</Col>
								</Row>
							</Card.Title>
							<Card.Link style={{ float: "right" }} href="#">
								Update Password
							</Card.Link>
						</Card.Body>
					</Card>
					<Card border="warning" className="mx-auto my-3">
						<Card.Body>
							<Card.Title>
								<Row className="mx-auto my-3">
									<Col xs={12} md={5}>
										Subscription Type
									</Col>
									<Col xs={12} md={7}>
										Free Version
									</Col>
								</Row>

								<Row className="mx-auto my-3">
									<Col xs={12} md={5}>
										Next Payment Due
									</Col>
									<Col xs={12} md={7}>
										None
									</Col>
								</Row>
							</Card.Title>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default ManageAccount;
