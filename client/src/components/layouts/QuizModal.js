import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Container } from "react-bootstrap";
import {
	useRespondent,
	getRespondentQuiz,
	takeQuiz,
	getRespondents,
	loadRespondent,
} from "../../context/respondent/RespondentState";
import FinishedQuizQuestion from "./FinishedQuizQuestion";
import calculateScore from "../utils/CalculateScore";

const QuizModal = ({
	showModal,
	hideModal,
	confirmModal,
	quiz,
	respondent,
	answered_quiz,
	// calculateScore
}) => {
	// quiz && respondent && calculateScore(quiz, answered_quiz, respondent);
	// console.log(answered_quiz);
	return (
		quiz &&
		respondent && (
			
			<Modal
				show={showModal}
				onHide={hideModal}
				size="lg"
				centered
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>
						Quiz {quiz.title} - {respondent.firstName} {respondent.lastName}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<Row>
							<p>
								<strong>Total Score: </strong> {answered_quiz.totalPointsGiven}{" "}
								/ {quiz.totalScore} points (
								{(
									(answered_quiz.totalPointsGiven / quiz.totalScore) *
									100
								).toFixed(1)}{" "}
								%)
							</p>
							<p>
								<strong>Time Used: </strong>
								{answered_quiz.timeTaken} / {quiz.timeLimit} minutes
							</p>
						</Row>

						{quiz.questions.map((question, index) => (
							<FinishedQuizQuestion key={question._id} question={question} answer={answered_quiz.questionsAnswered} index={index + 1} />
						))}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={hideModal}>
						Close
					</Button>
					<Button variant="danger" onClick={() => confirmModal()}>
						Confirm Update
					</Button>
				</Modal.Footer>
			</Modal>
		)
	);
};

export default QuizModal;
