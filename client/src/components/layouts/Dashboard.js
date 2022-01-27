import React from 'react'
import {Container, Table} from 'react-bootstrap';
import{NavLink as RouterNavLink} from 'react-router-dom';

const Dashboard = () => {
    const currentYear = new Date().getFullYear();

    return (
			<div>
				<Container style={{ marginTop: 30, marginBottom: 15 }}>
					<span class="mb-0 h3">Dashboard / Access your services</span>
				</Container>
				<div className="dash-card-row">
					<div className="dash-card-cell">
						<a href="#">Create Quiz</a>
					</div>
					<div className="dash-card-cell">
						<a href="/quizlist">Past Quizzes</a>
					</div>
					<div className="dash-card-cell">
						<a href="#"> Mailing List (TBD)</a>
					</div>
				</div>
				<div className="dash-card-row">
					<div className="dash-card-cell">
						<a href="/account"> Manage Account</a>
					</div>
					<div className="dash-card-cell">
						<a href="/contact"> Customer Service</a>
					</div>
					<div className="dash-card-cell">
						<a href="#">
							{" "}
							<img
								src={require("../../assets/logo_small_two.png")}
								className="img-fluid shadow-4"
							/>
						</a>
					</div>
					<div>
						All copyrights reserved, quizbanana.,llc {currentYear}
					</div>
				</div>
			</div>
		);
}

export default Dashboard
