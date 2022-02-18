import { React, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import RespondentContext from './RespondentContext';
import RespondentReducer from './RespondentReducer';

import {
    CLEAR_ERRORS, 
    CREATE_RESPONDENT, 
    RESPONDENT_ERROR,
    GET_RESPONDENTS,
    GET_RESPONDENT_QUIZ,
    RESPONDENT_LOADED,
    TAKE_QUIZ
} from '../types';

//create custom hook for respondent context
export const useRespondent = () => {
    const { state, dispatch } = useContext(RespondentContext);
    return [state, dispatch];
};

var RESPONDENT_ROUTE = '';
if(process.env.NODE_ENV === 'production') {
    RESPONDENT_ROUTE = '/api/respondent'
} else {
    RESPONDENT_ROUTE = 'http://localhost:7000/api/respondent';
}

//create respondent info taken before quiz
export const respondentInfo = async(dispatch, formData, hashKey, quizId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${RESPONDENT_ROUTE}/userInfo/${hashKey}/quiz/${quizId}`, formData, config);

        dispatch({
            type: CREATE_RESPONDENT,
            payload: res.data
        });

        // loadRespondent(respondentInfo, userId, quizId);

    } catch (err) {
        dispatch({
            type: RESPONDENT_ERROR,
            payload: err.response.data.msg || err.response.data.errors[0].msg
        });

        console.log(err.response);
    }
};

export const getRespondentQuiz = async(dispatch, hashKey, quizId) => {
    try {
        const res = await axios.get(`${RESPONDENT_ROUTE}/takeQuiz/${hashKey}/quiz/${quizId}`);

        dispatch({
            type: GET_RESPONDENT_QUIZ,
            payload: res.data.quiz_resp
        });
        loadRespondent(dispatch, hashKey, quizId);

    } catch (err) {
        dispatch({
            type:RESPONDENT_ERROR,
            payload: err.response.data.msg || err.response.data.errors[0].msg
        });
    }
};

//Load User
export const loadRespondent = async(dispatch, hashKey, quizId) => {
    try {
        const res = await axios.get(`${RESPONDENT_ROUTE}/takeQuiz/${hashKey}/quiz/${quizId}`);

        dispatch({
            type: RESPONDENT_LOADED,
            payload: res.data.respondent
        });

    } catch (err) {
        dispatch({
            type: RESPONDENT_ERROR,
            payload: err.response.data.msg || err.response.data.errors[0].msg
        });
    }
};

//Load User
export const getRespondents = async(dispatch, quizId) => {
    try {
        const res = await axios.get(`${RESPONDENT_ROUTE}/quiz/${quizId}`);

        dispatch({
            type: GET_RESPONDENTS,
            payload: res.data,
        });

    } catch (err) {
        dispatch({
            type: RESPONDENT_ERROR,
            payload: err.response.data.msg || err.response.data.errors[0].msg
        });
    }
};

export const takeQuiz = async(dispatch, formData, hashKey, quizId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${RESPONDENT_ROUTE}/takeQuiz/${hashKey}/quiz/${quizId}`, formData, config);

        dispatch({
            type: TAKE_QUIZ,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: RESPONDENT_ERROR,
            payload: err.response.data.msg || err.response.data.errors[0].msg
        });
        console.log(err.response)
    }
}

export const clearErrors = dispatch => dispatch({ type: CLEAR_ERRORS });

const RespondentState = props => {
    const initialState = {
        respondents: null,
        respondent: null,
        quiz_resp: null,
        error: null,
        loading: true
    };

    const [state, dispatch] = useReducer(RespondentReducer, initialState);

    // if(state.loading) {
    //     loadRespondent(dispatch, state.respondent.id)
    // }

    // useEffect(() => {
    // }, [state.respondent]);

    return(
        <RespondentContext.Provider
            value={{
                state:
                    state,
                    dispatch
            }}
        >
            { props.children }
        </RespondentContext.Provider>
    )
};

export default RespondentState;