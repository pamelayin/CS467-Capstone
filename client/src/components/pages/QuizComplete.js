import React from 'react';
import { useLocation } from "react-router-dom";
import CalculateScore from "../utils/CalculateScore";

const QuizComplete = () => {
    const {state} = useLocation();
    let calculateFinished = CalculateScore(state.quiz_id, state.resp_id);
    console.log(calculateFinished)
    return (
			calculateFinished && (
				<div style={{ margin: "auto", textAlign: "center" }}>
					<h1>You're all Set! Thank You!</h1>
				</div>
			)
		);
}

export default QuizComplete