import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import { useRespondent, getRespondentQuiz, takeQuiz } from '../../context/respondent/RespondentState';

const RespondentQuiz = () => {
    const [respondentState, respondentDispatch] = useRespondent();
    const { error, respondent, quiz } = respondentState;
    const { userId, quizId } = useParams();

    const [questionsAnswered, setQuestionsAnswered] = useState([]);

    let time = quiz && quiz.timeLimit;
    const [stateTimeLimit, setStateTimeLimit] = useState(0);

    const onTimeLimitChange = useCallback(() => {
        setInterval(() => setStateTimeLimit(stateTimeLimit - 1), 60000);
    },[stateTimeLimit]);

    // const clearTimer = () => {
    //     clearInterval(stateTimeLimit);
    // }

    useEffect(() => {
        setStateTimeLimit(time);
    }, [time])

    useEffect(() => {
        if(error) {
            console.log(error);
        }
        onTimeLimitChange();
        getRespondentQuiz(respondentDispatch, userId, quizId);
    }, [respondentDispatch, error, userId, quizId, onTimeLimitChange]);

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

    const onSubmit = e => {
        e.preventDefault();
        const data = mergeQuestionIds(e);
        console.log(questionsAnswered);
        console.log(data);

        takeQuiz(respondentDispatch, 
            { quizzes: data },
            userId,
            quizId
        );
    }

    return (
        <Container>
            <Container>
                <h1 className='shadow-sm p-3 text-center rounded' style={{ color: 'black' }}>{quiz && quiz.title}</h1><span style={{ display: 'inline'}}>
                    Time Limit: {stateTimeLimit}
                </span>
            </Container>
            {quiz && quiz.questions.map((q, i) => (
                <Row className='mt-5' key={q._id}>
                <Col lg={5} md={6} sm={12} className='p-5 m-auto shadow-sm rounded-lg'>
                    <Form onSubmit={onSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor='question'>{q.question}</Form.Label>
                        </Form.Group>
                        <Form.Group>
                            {q.answerOptions.map((a, index) => (
                                q.questionType === 'FA' ? (
                                    <Form.Control
                                        key={index}
                                        type='text'
                                        name='questionsAnswered'
                                        value={a}
                                        onChange={e => onChange(e)}
                                    />
                                ) : (
                                <Form.Check
                                    type={q.questionType === 'TF' || q.questionType === 'SC' ? 'radio' : 'checkbox'}
                                    key={index}
                                    label={a}
                                    id={q._id}
                                    value={a}
                                    name='questionsAnswered'
                                    onChange={e => onChange(e)}
                                />
                                )
                            ))}
                        </Form.Group>
                        <div style={{ 'marginTop': '0.5rem'}}>
                        </div>
                    </Form>
                </Col>
            </Row>
            ))}
            <Button variant='warning btn-block' type='submit' style={{ 'marginTop': '2rem'}} onClick={onSubmit}>Complete</Button>
        </Container>
    )
}

export default RespondentQuiz