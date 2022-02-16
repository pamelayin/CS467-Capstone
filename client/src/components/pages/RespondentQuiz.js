import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import { useRespondent, getRespondentQuiz, takeQuiz } from '../../context/respondent/RespondentState';

const RespondentQuiz = () => {
    const [respondentState, respondentDispatch] = useRespondent();
    const { error, respondent, quiz_resp } = respondentState;
    const { userId, quizId } = useParams();

    const [questionsAnswered, setQuestionsAnswered] = useState([{
        question_id: '',
        answerGiven: ''
    }]);

    // let time = quiz && quiz.timeLimit;

    // const [stateTimeLimit, setStateTimeLimit] = useState(time);

    // const onTimeLimitChange = useCallback(() => {
    //     setInterval(() => setStateTimeLimit(stateTimeLimit - 1), 10000);
    // },[stateTimeLimit],
    // );

    // const clearTimer = () => {
    //     clearInterval(stateTimeLimit);
    // }

    useEffect(() => {
        if(error) {
            console.log(error);
        }
        // onTimeLimitChange();
        getRespondentQuiz(respondentDispatch, userId, quizId);
    }, [respondentDispatch, error, userId, quizId]);

    const onChange = (e, q, i) => {
        if(e.target.checked) {
            if(!questionsAnswered[i]['answerGiven'].includes(e.target.value)) {
                setQuestionsAnswered([...questionsAnswered, 
                    { ...questionsAnswered[questionsAnswered.length], 
                        question_id: q._id, 
                        answerGiven: e.target.value
                    }
                ]);
            } else {
                setQuestionsAnswered(questionsAnswered.filter(answerGiven => 
                    answerGiven.answerGiven !== e.target.value));
            }
        }
    }

    const onSubmit = e => {
        e.preventDefault();

        console.log(questionsAnswered);

        takeQuiz(respondentDispatch, {
            questionsAnswered},
            userId,
            quizId
        );
    }

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
						Time Limit: {quiz_resp && quiz_resp.timeLimit}
					</span>
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
													name="answerGiven"
													value={a}
													onChange={(e) => onChange(e, q, i)}
												/>
											) : (
												<Form.Check
													type={
														q.questionType === "TF" || q.questionType === "SC"
															? "radio"
															: "checkbox"
													}
													key={index}
													label={a}
													value={a}
													name="answerGiven"
													onChange={(e) => onChange(e, q, i)}
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
}

export default RespondentQuiz