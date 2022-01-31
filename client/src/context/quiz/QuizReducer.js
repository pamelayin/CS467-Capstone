/* eslint-disable import/no-anonymous-default-export */
import {
    GET_QUIZZES,
    DELETE_QUIZ,
    QUIZ_ERROR,
    CLEAR_ERRORS
} from '../types';

const QuizReducer = (state, action) => {
    switch (action.type) {
			case CLEAR_ERRORS:
				return {
					...state,
					error: null,
				};
			case GET_QUIZZES:
				return {
					...state,
					quizzes: action.payload,
				};
			case DELETE_QUIZ:
				return {
					...state,
					quizzes: state.quizzes.filter(
						(quiz) => quiz._id !== action.payload
					),
				};
			case QUIZ_ERROR:
				return {
					...state,
					error: action.payload,
				};

			default:
				throw new Error(`Unsupported type of: ${action.type}`);
		}
}

export default QuizReducer;