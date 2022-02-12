import React, { useState, useEffect } from "react";
import { Container, Table, Row, Col } from "react-bootstrap";
import { useAuth } from "../../context/auth/AuthState";
import { useQuizzes, getQuiz } from "../../context/quiz/QuizState";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function QuizDashboard() {
	const [authState] = useAuth();
	const { isAuthenticated, user } = authState;

	const [quizState, quizDispatch] = useQuizzes();
	const { quiz } = quizState;

	useEffect(() => {
		getQuiz(quizDispatch, quiz);
	}, [quiz, quizDispatch]);

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

	return (
		<Container className="w-75">
			<h1 className="my-5">Quiz Dashboard - {quiz.title} </h1>
			<Row>
				<Col>
					<h4>Info</h4>
					<Table responsive>
						<tbody>
							<tr>
								<td>Total Points</td>
								<td>{quiz.totalScore}</td>
							</tr>
							<tr>
								<td>Time Limit</td>
								<td>{quiz.timeLimit}</td>
							</tr>
							<tr>
								<td>Number of Questions</td>
								<td>{quiz.questions.length}</td>
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
					<Doughnut data={completionData} />
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
				<h4>Individual Student Stats</h4>
				<Table striped bordered hover responsive>
					<thead>
						<tr>
							<th>#</th>
							<th>Student ID</th>
							<th>Student Email</th>
							<th>Total Points</th>
							<th>Time Used</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{/* {quiz &&
							quiz.map((student, index) => (
								<tr key={student._id}>
									<td>{index + 1}</td>
									<td>{student._id}</td>
									<td>{student.email}</td>
									<td>{student.totalScore} points</td>
									<td>{student.timeUsed} minutes</td>
									<td> */}
						<tr>
							<td>1</td>
							<td>id_1</td>
							<td>1@1.com</td>
							<td>1 pts</td>
							<td>15 minutes</td>
							<td>
								<a className="mx-3" href="#">
									view/grade quiz
								</a>
							</td>
						</tr>
						{/* ))} */}
					</tbody>
				</Table>
			</Row>
		</Container>
	);
}

export default QuizDashboard;
