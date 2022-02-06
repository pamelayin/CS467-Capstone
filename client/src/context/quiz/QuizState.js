import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import QuizContext from './QuizContext';
import QuizReducer from './QuizReducer';
import {
    GET_QUIZZES,
    GET_QUIZ,
    SET_QUIZ,
	DELETE_QUIZ,
	QUIZ_ERROR,
	CLEAR_ERRORS,
} from "../types";

// Creat custom hook to use auth context
export const useQuizzes = () => {
    const { state, dispatch } = useContext(QuizContext);
    return [state, dispatch];
};

var route = '';
if(process.env.NODE_ENV === 'production') {
    route = '/api/quiz';
} else {
    route = 'http://localhost:7000/api/quiz';
}

//Load quizzes
export const getQuizzes = async(dispatch) => {

    try {
        const res = await axios.get(route);

        dispatch({
            type: GET_QUIZZES,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: QUIZ_ERROR,
            payload: err.response.msg
        });
    }
};

//get quiz
export const getQuiz = async (dispatch, quiz) => {
    try {
		const res = await axios.get(route + `/${quiz._id}`);

		dispatch({
			type: GET_QUIZ,
			payload: res.data,
        });

	} catch (err) {
		dispatch({
			type: QUIZ_ERROR,
			payload: err.response.data.msg || err.response.data.errors[0].msg,
		});
	}
};

export const setQuiz = async (dispatch, quiz) => {
    try {
        dispatch({
            type: SET_QUIZ,
            payload: quiz
        });
    } catch (err) {
        dispatch({
            type: QUIZ_ERROR,
            payload: err.response.data.msg || err.response.data.errors[0].msg,
        });
    }
};

//delete quiz
export const deleteQuiz = async (dispatch, _id) => {
    try {
		await axios.delete(route + `/${_id}`);

		dispatch({
			type: DELETE_QUIZ,
			payload: _id,
        });

	} catch (err) {
		dispatch({
			type: QUIZ_ERROR,
			payload: err.response.data.msg || err.response.data.errors[0].msg,
		});
	}
};

//Clear Errors
export const clearErrors = (dispatch) => dispatch({ type: CLEAR_ERRORS });

const QuizState = props => {
    const initialState = {
        quiz: null,
        quizzes: null,
        error: null
    };

    const [state, dispatch] = useReducer(QuizReducer, initialState);


    return (
        <QuizContext.Provider
            value={{ 
                state: 
                    state, 
                    dispatch 
            }}
        >
            { props.children }
        </QuizContext.Provider>
    )
};

export default QuizState;