import { syncIndexes } from "mongoose";
import React from "react";
import {Button, Container, Row, Col} from 'react-bootstrap'

const FinishedQuizQuestion = ({ question, index }) => {
	console.log(question, index)
	const ColoredLine = ({ color }) => (
		<hr
			style={{
				color: color,
				backgroundColor: color,
				height: 1,
			}}
		/>
	);
	const instyle = {
		marginBottom: "5px",
	};
    return (
			<div>
				<Container style={instyle}>
					<ColoredLine color="grey" />
					<p style={instyle}>Points: {question.points}</p>
					<p style={instyle}>
						<strong>Question {index}</strong>
					</p>
					<p>{question.question}</p>
					<p style={instyle}>Correct Answer(s)</p>
					{/* multiple answers - check */}
					<p>{question.answer}</p>
					<p style={instyle}>Respondent Answer(s)</p>
					<p>{question.answer}</p>
				</Container>
			</div>
		);
}

export default FinishedQuizQuestion;
