import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Container} from "react-bootstrap";
import {
	useRespondent,
	getRespondentQuiz,
	takeQuiz,
	getRespondents,
	loadRespondent
} from "../../context/respondent/RespondentState";
import FinishedQuizQuestion from "./FinishedQuizQuestion";

// source: https://codemoto.io/coding/react/react-delete-confirmation-modal
const QuizModal = ({ showModal, hideModal, confirmModal, quiz, respondent }) => {

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
								<strong>Total Score: </strong>/ {quiz.totalScore} points
							</p>
							<p>
								<strong>Time Used: </strong>/ {quiz.timeLimit} minutes
							</p>
						</Row>
					
							{quiz.questions.map((question, index) => (
								<FinishedQuizQuestion question={question} index={index + 1}/>
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
