import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import { useRespondent, getRespondentQuiz, takeQuiz } from '../../context/respondent/RespondentState';

const RespondentQuiz = props => {
    const [respondentState, respondentDispatch] = useRespondent();
    const { error, respondent, quiz_resp } = respondentState;
    const { hashKey, quizId } = useParams();
    const navigate = useNavigate();

    const { history } = props;

    const [questionsAnswered, setQuestionsAnswered] = useState([]);
    const [freeResponse, setFreeResponse] = useState([]);

    let time = quiz_resp && quiz_resp.timeLimit;
    const [stateTimeLimit, setStateTimeLimit] = useState(0);

    const onTimeLimitChange = useCallback(() => {
        setInterval(() => setStateTimeLimit(stateTimeLimit => stateTimeLimit - 1), 60000);
    }, []);

    const clearTimer = () => {
        clearInterval(setStateTimeLimit(0));
    }

    useEffect(() => {
        setStateTimeLimit(time);
    }, [time])

    useEffect(() => {
        if(error) {
            console.log(error);
        }
        onTimeLimitChange();
        getRespondentQuiz(respondentDispatch, hashKey, quizId);
    }, [respondentDispatch, error, hashKey, quizId, onTimeLimitChange]);

    const onFreeResponseChange = e => {
        setFreeResponse([...freeResponse, ({
            question_id: e.target.id,
            answerGiven: e.target.value
        })]);
    }

    const onChange = e => {
        let answerGiven = questionsAnswered;

        if(e.target.checked) {
            if(!questionsAnswered.includes(e.target.value)) {
                setQuestionsAnswered([...questionsAnswered, ({
                    question_id: e.target.id,
                    answerGiven: e.target.value
                })]);
            }
        } else {
            answerGiven = answerGiven.filter(el => el.answerGiven !== e.target.value)
            setQuestionsAnswered(answerGiven);
        }
    }

    const mergeFreeResponse = e => {
        e.preventDefault();

        const data = Object.values(freeResponse.reduce((a, {question_id, answerGiven}) => {
            a[question_id] = a[question_id] || { question_id, answerGiven: new Set() };
            a[question_id].answerGiven.add(answerGiven);
            return a;
        }, {})).map(({question_id, answerGiven}) => ({ question_id, answerGiven: [...answerGiven].slice(-1)[0]}));

        return data;
    }

    //https://stackoverflow.com/questions/57703415/how-to-merge-array-of-objects-if-duplicate-values-are-there-if-key-is-common-th
    const mergeQuestionIds = e => {
        e.preventDefault();

        const data = Object.values(questionsAnswered.reduce((a, {question_id, answerGiven}) => {
            a[question_id] = a[question_id] || { question_id, answerGiven: new Set() };
            a[question_id].answerGiven.add(answerGiven);
            return a;
        }, {})).map(({question_id, answerGiven}) => ({ question_id, answerGiven: [...answerGiven].join(",")}));

        return data;
    }

    const mergeArrays = (radioCheckArr, freeResponseArr) => {
        return radioCheckArr.concat(freeResponseArr);
    }

    const timeTaken = () => {
        let totalTime;

        totalTime = time - stateTimeLimit;

        return totalTime;
    }

    const onSubmit = e => {
        e.preventDefault();
        const data = mergeQuestionIds(e);
        const freeAnswer = mergeFreeResponse(e);

        const quizData = mergeArrays(data, freeAnswer);

        console.log(quizData);
        const totalTime = timeTaken();

        takeQuiz(respondentDispatch, 
            {
                timeTaken: totalTime,
                questionsAnswered: quizData
            },
            hashKey,
            quizId
        );

        clearTimer();
        navigate('/quizComplete')
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
                    Time Limit: {stateTimeLimit}{' '}
                </span><span>
                    Candidate ID: {respondent && respondent._id}
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
                                        {q.answerOptions.map((a, index) => (
                                            q.questionType === 'FR' ? (
                                                    <Form.Control
                                                        key={index}
                                                        id={q._id}
                                                        type="text"
                                                        name='answerGiven'
                                                        placeholder='Enter Answer'
                                                        value={freeResponse.answerGiven}
                                                        onChange={(e) => onFreeResponseChange(e)}
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
                                                id={q._id}
                                                name="questionsAnswered"
                                                onChange={(e) => onChange(e)}
                                            />
                                        )))}
                                    </Form.Group>
                                <div style={{ marginTop: "0.5rem" }}></div>
                            </Form>
                        </Col>
                    </Row>
                ))}
                <Container 
                    style={{ marginTop: "2rem", alignItems: 'center' }}>
                    <Button
                        variant="warning btn-block"
                        type="submit"
                        onClick={onSubmit}
                    >
                        Complete
                    </Button>
                </Container>
        </Container>
	);
}

export default RespondentQuiz