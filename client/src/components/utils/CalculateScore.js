import React, { useState, useEffect } from "react";
import { useQuizzes, getQuiz, updateQuiz } from "../../context/quiz/QuizState";
import {
	useRespondent,
	getRespondentQuizById,
	loadRespondent,
	updateRespondentQuiz,
} from "../../context/respondent/RespondentState";

const CalculateScore = (quiz_id, respondent_id) => {
	const [quizState, quizDispatch] = useQuizzes();
	const { quiz } = quizState;
	const [respondentState, respondentDispatch] = useRespondent();
	const { error, respondent, quiz_resp_ans, respondents } = respondentState;
	// console.log("quiz id: " + quiz_id);
	// console.log("resp_id:", respondent_id);

	const [finishedGrading, setFinishedGrading] = useState(false);
	// const [gradedQuiz, setGradedQuiz] = useState();

	useEffect(() => {
		getQuiz(quizDispatch, quiz_id);
	}, []);

	useEffect(() => {
		getRespondentQuizById(respondentDispatch, respondent_id, quiz_id);
	}, []);

	// quiz && quiz_resp_ans && console.log(quiz);
	// console.log(quiz_resp_ans.questionsAnswered);
	if (quiz && quiz_resp_ans) {
		console.log(quiz);
		console.log(quiz_resp_ans);
		let gradedQuestions = [];
		let totalPoints = 0.0;
		for (var i = 0; i < quiz.questions.length; i++) {
			let curr_question = quiz.questions[i];
			let question_id = curr_question._id;
			let question_ans = quiz_resp_ans.questionsAnswered.find(
				(q) => q.question_id === question_id
			);
			if (question_ans) {
				if (
					curr_question.questionType === "TF" ||
					curr_question.questionType === "SC"
				) {
					// console.log('tf or sc');
					if (curr_question.answer[0] === question_ans.answerGiven[0]) {
						question_ans["pointsGiven"] = curr_question.points;
						totalPoints += curr_question.points;
					} else {
						question_ans["pointsGiven"] = 0;
					}
				} else if (curr_question.questionType === "MC") {
					let totalMCPoints = 0.0;
					let partialPoints =
						(curr_question.points * 1.0) / curr_question.answer.length;
					for (var j = 0; j < question_ans.answerGiven.length; j++) {
						if (
							curr_question.answer.find(
								(ans) => ans === question_ans.answerGiven[j]
							)
						) {
							totalMCPoints += partialPoints;
						}
					}
					question_ans["pointsGiven"] = totalMCPoints;
					totalPoints += totalMCPoints;
				}
				gradedQuestions.push(question_ans);
				console.log("graded");
				console.log(gradedQuestions);
			}
		}

		updateRespondentQuiz(respondentDispatch, respondent_id, quiz_id, {
			questionsAnswered: gradedQuestions,
			totalPointsGiven: totalPoints,
		});
		if (error) {
			alert(error);
		} else {
			setFinishedGrading(true);
		}
	}

	return finishedGrading ? true : null;
};
export default CalculateScore;
