  
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

const ColoredLine = ({ color }) => (
	<hr
		style={{
			color: color,
			backgroundColor: color,
			height: 1,
		}}
	/>
);

function QuizDashboard() {
	const [authState] = useAuth();
	const { isAuthenticated, user } = authState;
	const { quiz_id } = useParams();
	const [quizState, quizDispatch] = useQuizzes();
	const { quiz } = quizState;
	const [respondentState, respondentDispatch] = useRespondent();
	const { error, respondent, quiz_resp_ans, respondents } = respondentState;
	const tooltipRef = useRef();

	const [numStatus, setNum] = useState({
		dataLoad: false,
		numSent:0,
		numTaken:0,
		numNotTaken:0,
		totalPoint:0,
		titmeLimit:0,
		numQuestion:0,
		totalPoint:0,
		AvgScore:0,
		HighestScore:0,
		LowestScore:0,
		AverageTime:0,
		aboveAvg:0,
		belowAvg:0,
		aroundAvg:0,
	})

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

	const dataLoadAll = () =>{
		if(quiz && respondents){
			var totalS = 0;
			var totalT = 0;
			var high = 0;
			var low = quiz.totalScore;
			var Average = 0;
			var avgHigh = 0;
			var avgLow = 0;
			var avgAround = 0;

			for(var i = 0; i < respondents.length; i++)
			{
				var curr_point = respondents[i].current_quiz.totalPointsGiven;
				var curr_time = respondents[i].current_quiz.timeTaken;
				totalS += curr_point;
				totalT += curr_time;
				if(curr_point > high){high = curr_point}
				if(curr_point < low){low = curr_point}
			}

			Average = totalS/respondents.length;

			for(var i = 0; i < respondents.length; i++)
			{
				var curr_point = respondents[i].current_quiz.totalPointsGiven;
				if(curr_point == Math.floor(Average) || Math.ceil(Average)){
					avgAround++;
				}
				else if(curr_point > Math.floor(Average)){
					avgHigh++;
				}
				else{
					avgLow++;
				}
			}

			setNum({
				dataLoad : true,
				numSent: quiz.totalEmailsSent,
				numTaken: respondents.length,
				numNotTaken:(quiz.totalEmailsSent - respondents.length),
				totalPoint:quiz.totalScore,
				titmeLimit:quiz.timeLimit,
				numQuestion:quiz.questions.length,
				AvgScore:Average,
				HighestScore:high,
				LowestScore:low,
				AverageTime:(totalT/respondents.length),
				aboveAvg:avgHigh,
				belowAvg:avgLow,
				aroundAvg:avgAround,
			})
		}
	}

	function drawData(){
		if(numStatus.dataLoad == false){
			dataLoadAll()
		}else{
			return(
				<Container fluid>
					<Row>
						<Col>
							<h4>Quiz Information</h4>
							<Table responsive>
								<tbody>
									<tr>
										<td>Total Points</td>
										<td>{numStatus.totalPoint}</td>
									</tr>
									<tr>
										<td>Time Limit</td>
										<td>{numStatus.titmeLimit}</td>
									</tr>
									<tr>
										<td>Number of Questions</td>
										<td>{numStatus.numQuestion}</td>
									</tr>
									<tr>
										<td>Quizzes Sent Out</td>
										<td>{numStatus.numSent}</td>
									</tr>
									<tr>
										<td>Quizzes Taken</td>
										<td>{numStatus.numTaken}</td>
									</tr>
								</tbody>
							</Table>
						</Col>
						<Col>
							<h4>Quiz Statistic</h4>
							<Table responsive>
								<tbody>
									<tr>
										<td>Average Score</td>
										<td>{numStatus.AvgScore}</td>
									</tr>
									<tr>
										<td>Highest Score</td>
										<td>{numStatus.HighestScore}</td>
									</tr>
									<tr>
										<td>Lowest Score</td>
										<td>{numStatus.LowestScore}</td>
									</tr>
									<tr>
										<td>Average Time Taken</td>
										<td>{numStatus.AverageTime}</td>
									</tr>
								</tbody>
							</Table>
							<br />
							<br />
						</Col>
					</Row>
					<br/>
					<br />
					<Row>
				<Col>
					<h4 style={{ textAlign: "center" }}>Quiz Completion Status</h4>
					<Doughnut data={completionData} options={options} />
					<br />
					<br />
				</Col>
				<Col>
					<h4 style={{ textAlign: "center", paddingBottom:100}}>Score Distribution (%)</h4>
					<br />
					<br />
				</Col>
			</Row>
			</Container>
			)
		}
		
	}

	return (
		<Container className="w-75">
			{drawData()},
			{ColoredLine("grey")},
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

