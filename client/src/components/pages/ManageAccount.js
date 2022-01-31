import React from "react";
import { Container, Row, Col, Card} from "react-bootstrap";
import { useAuth } from "../../context/auth/AuthState";

function ManageAccount() {
    const [authState] = useAuth();
	const { isAuthenticated, user } = authState;

	return (
		<Container>
			<h1 className="my-5">Your Account</h1>
			<Row>
				<Col xs={12} md={6}>
					<Card
						style={{ border: "1px solid #FFC300" }}
						className="mx-auto my-3"
					>
						<Card.Body>
							<Card.Title>
								<Row className="mx-auto my-3">
									<Col md={12} lg={4}>
										Full Name
									</Col>
									<Col md={12} lg={8}>
										{isAuthenticated && user && user.firstName}{" "}
										{isAuthenticated && user && user.lastName}
									</Col>
								</Row>

								<Row className="mx-auto my-3">
									<Col md={12} lg={4}>
										Organization
									</Col>
									<Col md={12} lg={8}>
										{isAuthenticated && user && user.organization}
									</Col>
								</Row>
								<Row className="mx-auto my-3">
									<Col md={12} lg={4}>
										Email
									</Col>
									<Col md={12} lg={8}>
										{isAuthenticated && user && user.email}
									</Col>
								</Row>

								<Row className="mx-auto my-3">
									<Col md={12} lg={4}>
										Password
									</Col>
									<Col md={12} lg={8}>
										***********
									</Col>
								</Row>
							</Card.Title>
							<br />
							<Card.Link className="mx-3" href="/editprofile">
								Update Profile
							</Card.Link>
							<Card.Link
								style={{ float: "right" }}
								className="mx-3"
								href="/editprofile"
							>
								Update Password
							</Card.Link>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={12} md={6}>
					<Card
						style={{ border: "1px solid #FFC300" }}
						className="mx-auto my-3"
					>
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
