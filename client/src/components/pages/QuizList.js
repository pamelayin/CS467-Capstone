import React, { useState, useEffect } from "react";
// import moment from 'moment';
import { Container, Table } from "react-bootstrap";
import { useAuth } from "../../context/auth/AuthState";
import { useQuizzes, getQuizzes, deleteQuiz } from "../../context/quiz/QuizState";
import AlertModal from "../Alerts/AlertModal";

function QuizList() {
	const [authState] = useAuth();
	const { isAuthenticated, user } = authState;

	const [quizState, quizDispatch] = useQuizzes();
	const { quizzes } = quizState;

	useEffect(() => {
		getQuizzes(quizDispatch);
	}, [quizDispatch]);

	// delete modal
	const [type, setType] = useState();
	const [id, setId] = useState();
	const [displayModal, setDisplayModal] = useState(false);
	const [deleteMessage, setDeleteMessage] = useState();

	// source: https://codemoto.io/coding/react/react-delete-confirmation-modal
	const showModal = (type, id) => {
		setType(type);
		setId(id);
		if (type === "quiz") {
			setDeleteMessage(
				"Are you sure you want to delete this quiz?"
			);
		}

		setDisplayModal(true);
	};

	const hideModal = () => {
		setDisplayModal(false);
	};

	const onDelete = () => {
		deleteQuiz(quizDispatch, id);	
		hideModal();
	};

	return (
		<Container>
			<h1 className="my-5">Past Quizzes</h1>
			<Table striped bordered hover responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>Quiz ID</th>
						<th>Quiz Title</th>
						<th>Total Points</th>
						<th>Time Limit</th>
						<th>Created At</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{quizzes &&
						quizzes.map((quiz, index) => (
							<tr key={quiz._id}>
								<td>{index + 1}</td>
								<td>{quiz._id}</td>
								<td>{quiz.title}</td>
								<td>{quiz.totalScore} points</td>
								<td>{quiz.timeLimit} minutes</td>
								{/* <td>{moment(quiz.createdAt).format("YYYY-MM-DD HH:mm")}</td> */}
								<td>
									<a className="mx-3" href="/">
										view/edit
									</a>
									<a href="#" onClick={() => showModal("quiz", quiz._id)}>
										delete
									</a>
								</td>
							</tr>
						))}
					<AlertModal
						showModal={displayModal}
						confirmModal={onDelete}
						hideModal={hideModal}
						type={type}
						id={id}
						message={deleteMessage}
					/>
				</tbody>
			</Table>
		</Container>
	);
}

export default QuizList;
