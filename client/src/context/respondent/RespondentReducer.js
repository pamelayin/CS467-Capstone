import {
	CREATE_RESPONDENT,
	GET_RESPONDENT_QUIZ,
	GET_RESPONDENT_QUIZ_ANSWERED,
	LOAD_RESPONDENTS,
	RESPONDENT_ERROR,
	RESPONDENT_LOADED,
	UPDATE_RESPONDENT_QUIZ,
	TAKE_QUIZ,
    CLEAR_ERRORS,
    GET_RESPONDENT_INFO
} from "../types";

const RespondentReducer = (state, action) => {
	switch (action.type) {
		case CREATE_RESPONDENT:
			return {
				...state,
				respondent: action.payload,
				loading: false,
			};
		case GET_RESPONDENT_QUIZ:
			return {
				...state,
				quiz_resp: action.payload,
				loading: false,
			};
		case GET_RESPONDENT_QUIZ_ANSWERED:
			return {
				...state,
				quiz_resp_ans: action.payload,
				loading: false,
			};
		case UPDATE_RESPONDENT_QUIZ:
			return {
				...state,
				respondent: action.payload,
				loading: false,
			};
		case LOAD_RESPONDENTS:
			return {
				...state,
				respondents: action.payload,
				// respondents: action.payload.respondents,
				// quiz_resp_all: action.payload.quiz_resp_all,
				loading: false,
			};
        case GET_RESPONDENT_INFO:
            return {
                ...state,
                respondent: action.payload,
                loading: false
            };
		case RESPONDENT_ERROR:
			return {
				...state,
				error: action.payload,
				loading: true,
			};
		case RESPONDENT_LOADED:
			return {
				...state,
				respondent: action.payload,
				loading: false,
			};
		case TAKE_QUIZ:
			return {
				...state,
				respondent: action.payload,
				loading: false,
				updateFinish: true,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			throw new Error(`Unsupported type of: ${action.type}`);
	}
};

export default RespondentReducer;
