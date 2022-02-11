import {
    CREATE_RESPONDENT,
    GET_RESPONDENT_QUIZ,
    RESPONDENT_ERROR,
    RESPONDENT_LOADED,
    TAKE_QUIZ
} from '../types';

const RespondentReducer = (state, action) => {
    switch(action.type) {
        case CREATE_RESPONDENT:
            return {
                ...state,
                respondent: action.payload,
                loading: false
            }
        case GET_RESPONDENT_QUIZ:
            return {
                ...state,
                quiz: action.payload,
                loading: false
            }
        case RESPONDENT_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: true
            }
        case RESPONDENT_LOADED:
            return {
                ...state,
                respondent: action.payload,
                loading: false
            }
        case TAKE_QUIZ:
            return {
                ...state,
                respondent: action.payload,
                loading: false
            }
        default:
            throw new Error(`Unsupported type of: ${action.type}`);
    }
};

export default RespondentReducer;