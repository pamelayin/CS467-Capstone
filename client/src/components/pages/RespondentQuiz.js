import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import {
	useRespondent,
	getRespondentQuiz,
	takeQuiz,
} from "../../context/respondent/RespondentState";

const RespondentQuiz = () => {
	const [respondentState, respondentDispatch] = useRespondent();
	const { error, respondent, quiz_resp } = respondentState;
	const { hashKey, quizId } = useParams();

	let time = quiz_resp && quiz_resp.timeLimit;
	const [stateTimeLimit, setStateTimeLimit] = useState(0);

	const onTimeLimitChange = useCallback(() => {
		setInterval(
			() => setStateTimeLimit((stateTimeLimit) => stateTimeLimit - 1),
			60000
		);
	}, []);

	const clearTimer = () => {
		clearInterval(setStateTimeLimit(0));
	};

	useEffect(() => {
		setStateTimeLimit(time);
	}, [time]);

	useEffect(() => {
		if (error) {
			console.log(error);
		}
		onTimeLimitChange();
		getRespondentQuiz(respondentDispatch, hashKey, quizId);
	}, [respondentDispatch, error, hashKey, quizId, onTimeLimitChange]);

	const [questionsAnswered, setQuestionsAnswered] = useState([]);

	const onChange = (e, type) => {
		const answer = { question_id: e.target.id, answerGiven: e.target.value };
		let answers;
		if (type === "radio" || type === "text") {
			if (questionsAnswered.find((ans) => ans.question_id === e.target.id)) {
				answers = [
					...questionsAnswered.filter((ans) => ans.question_id !== e.target.id),
					answer,
				];
			} else {
				answers = [...questionsAnswered, answer];
			}
		} else if (type === "checkbox") {
			const uncheck_answer = questionsAnswered.find(
				(ans) =>
					ans.question_id === e.target.id &&
					ans.answerGiven === e.target.value
			);
			if (uncheck_answer){
				answers = [...questionsAnswered.filter(
					(ans) =>
						ans !== uncheck_answer
				)]
			} else {
				answers = [...questionsAnswered, answer];
			}
		}
		setQuestionsAnswered(answers);
	};

	//https://stackoverflow.com/questions/57703415/how-to-merge-array-of-objects-if-duplicate-values-are-there-if-key-is-common-th
	const mergeQuestionIds = (e) => {
		e.preventDefault();

		const data = Object.values(
			questionsAnswered.reduce((a, { question_id, answerGiven }) => {
				a[question_id] = a[question_id] || {
					question_id,
					answerGiven: new Set(),
				};
				a[question_id].answerGiven.add(answerGiven);
				return a;
			}, {})
		).map(({ question_id, answerGiven }) => ({
			question_id,
			answerGiven: [...answerGiven].join(","),
		}));

		return data;
	};

	const timeTaken = () => {
		let totalTime;

		totalTime = time - stateTimeLimit;

		return totalTime;
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const data = mergeQuestionIds(e);
		console.log(questionsAnswered);
		console.log(data);
		const totalTime = timeTaken();

		takeQuiz(
			respondentDispatch,
			{
				timeTaken: totalTime,
				questionsAnswered: data,
			},
			hashKey,
			quizId
		);

		clearTimer();
		alert("You have now finished");
	};

	return (
		<Container>
			<Container>
				<h1
					className="shadow-sm p-3 text-center rounded"
					style={{ color: "black" }}
				>
					{quiz_resp && quiz_resp.title}
				</h1>
				<span style={{ display: "inline" }}>
					Time Limit: {stateTimeLimit} minutes{" "}
				</span>
				<span>Hash ID: {respondent && respondent.hashKey}</span>
			</Container>
			{quiz_resp &&
				quiz_resp.questions.map((q, i) => (
					<Row className="mt-5" key={q._id}>
						<Col
							lg={5}
							md={6}
							sm={12}
							className="p-5 m-auto shadow-sm rounded-lg"
						>
							<Form onSubmit={onSubmit}>
								<Form.Group>
									<Form.Label htmlFor="question">{q.question}</Form.Label>
								</Form.Group>
								<Form.Group>
									{q.answerOptions.map((a, index) =>
										q.questionType === "FR" ? (
											<Form.Control
												key={index}
												type="text"
												name="questionsAnswered"
												id={q._id}
												onChange={(e) => onChange(e, "text")}
											/>
										) : q.questionType === "TF" || q.questionType === "SC" ? (
											<Form.Check
												type={"radio"}
												key={index}
												label={a}
												value={a}
												id={q._id}
												name="questionsAnswered"
												onChange={(e) => onChange(e, "radio")}
											/>
										) : (
											<Form.Check
												type={"checkbox"}
												key={index}
												label={a}
												value={a}
												id={q._id}
												name="questionsAnswered"
												onChange={(e) => onChange(e, "checkbox")}
											/>
										)
									)}
								</Form.Group>
								<div style={{ marginTop: "0.5rem" }}></div>
							</Form>
						</Col>
					</Row>
				))}
			<Button
				variant="warning btn-block"
				type="submit"
				style={{ marginTop: "2rem" }}
				onClick={onSubmit}
			>
				Complete
			</Button>
		</Container>
	);
};

export default RespondentQuiz;