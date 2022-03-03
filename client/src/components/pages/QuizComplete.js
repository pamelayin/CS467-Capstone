import React from 'react';
import { useLocation } from "react-router-dom";
import CalculateScore from "../utils/CalculateScore";

const QuizComplete = () => {
	const { state } = useLocation();
	let calculateFinished = CalculateScore(state.quiz_id, state.resp_id);
	if (calculateFinished) {
		return (
			<div style={{ margin: "auto", textAlign: "center" }}>
				<h1>Your quiz has been successfully submitted.</h1>
			</div>
		);
    } else {
        return null;
    }
};
export default QuizComplete;
