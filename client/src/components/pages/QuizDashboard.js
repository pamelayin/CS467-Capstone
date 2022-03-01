import React, { useState, useEffect, useRef } from "react";
import {
	Container,
	Table,
	Row,
	Col,
	Button,
	Tooltip,
	OverlayTrigger,
} from "react-bootstrap";
import { useAuth } from "../../context/auth/AuthState";
import { useQuizzes, getQuiz } from "../../context/quiz/QuizState";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip as ChartTooltip,
	Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import QuizModal from "../layouts/QuizModal";
import {
	useRespondent,
	getRespondentQuizById,
	loadRespondents,
	updateRespondentQuiz,
} from "../../context/respondent/RespondentState";

ChartJS.register(ArcElement, ChartTooltip, Legend);

function QuizDashboard() {
	const [authState] = useAuth();
	const { isAuthenticated, user } = authState;
	const { quiz_id } = useParams();
	const [quizState, quizDispatch] = useQuizzes();
	const { quiz } = quizState;
	const [respondentState, respondentDispatch] = useRespondent();
	const { error, respondent, quiz_resp_ans, respondents } = respondentState;
	const tooltipRef = useRef();

	useEffect(() => {
		getQuiz(quizDispatch, quiz_id);
	}, [quizDispatch, quiz_id]);
	useEffect(() => {
		loadRespondents(respondentDispatch, quiz_id);
	}, [respondentDispatch, quiz_id]);

	const completionData = {
		labels: ["Not Completed", "Completed"],
		datasets: [
			{
				label: "Quiz Completion Chart",
				data: [
					quiz && respondents && quiz.totalEmailsSent
						? quiz.totalEmailsSent - respondents.length
						: 0,
					respondents && respondents.length ? respondents.length : 0,
				],
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
		getRespondentQuizById(respondentDispatch, respondent_id, quiz_id);
		setShowModal(true);
	};

	const updateQuizConfirm = (updatedRespondentQuiz) => {
		hideModal();
		console.log(updatedRespondentQuiz);

		updateRespondentQuiz(
			respondentDispatch,
			updatedRespondentQuiz.respondent_id,
			updatedRespondentQuiz.quiz_id,
			{
				questionsAnswered: updatedRespondentQuiz.questionsAnswered,
				totalPointsGiven: updatedRespondentQuiz.totalPointsGiven,
				timeTaken: updatedRespondentQuiz.timeTaken,
			}
		);
		if (error) {
			alert(error);
		} else {
			window.location.reload();
		}
	};
	return (
		<Container className="w-75">
			<h1 className="my-5" style={{ textAlign: "center" }}>
				Quiz Dashboard - {quiz && quiz.title}{" "}
			</h1>
			<Row>
				<Col>
					<h4>Info</h4>

					<Table responsive>
						<tbody>
							<tr>
								<td>Total Available Points</td>
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
								<td>
									{quiz && quiz.totalEmailsSent ? quiz.totalEmailsSent : 0}
								</td>
							</tr>
							<tr>
								<td>Quizzes Taken</td>
								<td>
									{respondents && respondents.length ? respondents.length : 0}{" "}
								</td>
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
				<h4 style={{ textAlign: "center" }}>Individual Respondent Stats</h4>
				<br />
				<br />
				{respondents && respondents.length > 0 ? (
					<Table striped bordered hover responsive>
						<thead>
							<tr>
								<OverlayTrigger
									placement="top"
									overlay={
										<Tooltip>
											Ranking is based on total points received.
										</Tooltip>
									}
								>
									<th>Ranking </th>
								</OverlayTrigger>
								<th>Name</th>
								<th>School</th>
								<th>Email</th>
								<th>Points Received</th>
								<th>Time Used</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{respondents &&
								quiz &&
								respondents
									.sort(function (a, b) {
										return (
											(b.current_quiz.totalPointsGiven != null) -
												(a.current_quiz.totalPointsGiven != null) ||
											b.current_quiz.totalPointsGiven -
												a.current_quiz.totalPointsGiven
										);
									})
									.map((respondent, index) => (
										<tr key={respondent._id} id={respondent._id}>
											<td>{index + 1}</td>
											<td>
												{respondent.firstName} {respondent.lastName}
											</td>
											<td>{respondent.school}</td>
											<td>{respondent.email}</td>
											{respondent.current_quiz.hasOwnProperty(
												"totalPointsGiven"
											) ? (
												<td>
													{respondent.current_quiz.totalPointsGiven}/
													{quiz.totalScore} points
												</td>
											) : (
												<td style={{ color: "red" }}>Needs Grading</td>
											)}
											{respondent.current_quiz.hasOwnProperty("timeTaken") ? (
												<td>{respondent.current_quiz.timeTaken} minutes</td>
											) : (
												<td>N/A</td>
											)}
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
				) : (
					<h5>There are no respondents for this quiz. </h5>
				)}
			</Row>

			{respondents && quiz && quiz_resp_ans && (
				<QuizModal
					showModal={showModal}
					confirmModal={updateQuizConfirm}
					hideModal={hideModal}
					quiz={quiz}
					answered_quiz={quiz_resp_ans}
					respondent={respondent}
				/>
			)}
		</Container>
	);
}

export default QuizDashboard;
