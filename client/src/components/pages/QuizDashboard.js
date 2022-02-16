import React, { useState, useEffect } from "react";
import { Container, Table, Row, Col, Button } from "react-bootstrap";
import { useAuth } from "../../context/auth/AuthState";
import { useQuizzes, getQuiz } from "../../context/quiz/QuizState";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import QuizModal from "../layouts/QuizModal";
import {
	useRespondent,
	getRespondentQuiz,
	getRespondents,
} from "../../context/respondent/RespondentState";

ChartJS.register(ArcElement, Tooltip, Legend);

function QuizDashboard() {
	const [authState] = useAuth();
	const { isAuthenticated, user } = authState;
	const { quiz_id } = useParams();
	const [quizState, quizDispatch] = useQuizzes();
	const { quiz } = quizState;
	const [respondentState, respondentDispatch] = useRespondent();
	const { error, respondent, quiz_resp, respondents } = respondentState;

	useEffect(() => {
		getQuiz(quizDispatch, quiz_id);
	}, [quizDispatch, quiz_id]);
	useEffect(() => {
		getRespondents(respondentDispatch, quiz_id);
	}, [respondentDispatch, quiz_id]);

	const completionData = {
		labels: ["Not Completed", "Completed"],
		datasets: [
			{
				label: "Quiz Completion Chart",
				data: [15, 85],
				backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
				hoverOffset: 20,
				hoverBorderWidth: 2,
				offset: 5,
			},
		],
	};

	const options = {
		layout: {
			padding: 30,
			margin: 30,
		},
	};

	const [showModal, setShowModal] = useState(false);

	const hideModal = () => {
		setShowModal(false);
	};

	const showQuizModal = (respondent_id) => {
		getRespondentQuiz(respondentDispatch, respondent_id, quiz_id);
		setShowModal(true);
	};

	return (
		<Container className="w-75">
			<h1 className="my-5">Quiz Dashboard - {quiz && quiz.title} </h1>
			<Row>
				<Col>
					<h4>Info</h4>
					<Table responsive>
						<tbody>
							<tr>
								<td>Total Points</td>
								<td>{quiz && quiz.totalScore}</td>
							</tr>
							<tr>
								<td>Time Limit</td>
								<td>{quiz && quiz.timeLimit}</td>
							</tr>
							<tr>
								<td>Number of Questions</td>
								<td>{quiz && quiz.questions.length}</td>
							</tr>
							<tr>
								<td>Quizzes Sent Out</td>
								<td>100</td>
							</tr>
							<tr>
								<td>Quizzes Taken</td>
								<td>100</td>
							</tr>
						</tbody>
					</Table>
				</Col>
				<Col>
					<h4>Stats</h4>
					<Table responsive>
						<tbody>
							<tr>
								<td>Average Score</td>
								<td>50 points</td>
							</tr>
							<tr>
								<td>Highest Score</td>
								<td>100 points</td>
							</tr>
							<tr>
								<td>Lowest Score</td>
								<td>0 points</td>
							</tr>
							<tr>
								<td>Average Time Taken</td>
								<td>30 minutes</td>
							</tr>
						</tbody>
					</Table>
					<br />
					<br />
				</Col>
			</Row>
			<Row>
				<Col>
					<h4 style={{ textAlign: "center" }}>Quiz Completion Status</h4>
					<Doughnut data={completionData} options={options} />
					<br />
					<br />
				</Col>
				<Col>
					<h4>Chart 2</h4>
					<br />
					<br />
				</Col>
			</Row>
			<Row>
				<h4>Individual Respondent Stats</h4>
				<Table striped bordered hover responsive>
					<thead>
						<tr>
							<th>#</th>
							<th>ID</th>
							<th>Email</th>
							<th>Name</th>
							<th>Total Points</th>
							<th>Time Used</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{respondents &&
							respondents.map((respondent, index) => (
								<tr key={respondent._id} id={respondent._id}>
									<td>{index + 1}</td>
									<td>{respondent._id}</td>
									<td>{respondent.email}</td>
									<td>
										{respondent.firstName} {respondent.lastName}
									</td>
									<td>{respondent.totalScore} points</td>
									<td>{respondent.timeUsed} minutes</td>
									<td>
										<a
											className="mx-3"
											href="#"
											onClick={() => showQuizModal(respondent._id)}
										>
											view/grade quiz
										</a>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			</Row>
			{respondents && quiz && (
				<QuizModal
					showModal={showModal}
					// confirmModal={deleteAccountConfirm}
					hideModal={hideModal}
					quiz={quiz_resp}
					respondent={respondent}
				/>
			)}
		</Container>
	);
}

export default QuizDashboard;
