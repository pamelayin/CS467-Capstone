import React, { useState, useEffect } from "react";
import { Container, Table, Row, Col } from "react-bootstrap";
import { useAuth } from "../../context/auth/AuthState";
import { useQuizzes, getQuiz, getQuizzes} from "../../context/quiz/QuizState";

function QuizList() {
	const [authState] = useAuth();
	const { isAuthenticated, user } = authState;

	const [quizState, quizDispatch] = useQuizzes();
	const { quiz } = quizState;

	useEffect(() => {
		getQuizzes(quizDispatch);
	}, [quizDispatch]);

	return (
		<Container>
			<h1 className="my-5">Quiz Dashboard</h1>
			<Row>
				<Col>
					<h4>Info</h4>
					<Table responsive>
						<tbody>
							<tr>
								<td>Total Quizzes Sent Out</td>
								<td>100</td>
							</tr>
							<tr>
								<td>Total Quizzes Taken</td>
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
					<h4>Chart 1</h4>
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

export default QuizList;
