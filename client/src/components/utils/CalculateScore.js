import React, { useState, useEffect, Fragment } from "react";
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

	const [finishedGrading, setFinishedGrading] = useState(false);

	useEffect(() => {
		getQuiz(quizDispatch, quiz_id);
	}, [quizDispatch]);

	useEffect(() => {
		getRespondentQuizById(respondentDispatch, respondent_id, quiz_id);
	}, [respondentDispatch]);

	if (quiz && quiz_resp_ans && finishedGrading === false) {
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
			} else {
				question_ans = {};
				question_ans["answerGiven"] = [];
				question_ans["question_id"] = question_id;
				question_ans["pointsGiven"] = 0;
				gradedQuestions.push(question_ans);
			}
		};

		updateRespondentQuiz(respondentDispatch, respondent_id, quiz_id, {
			questionsAnswered: gradedQuestions,
			totalPointsGiven: totalPoints,
			timeTaken: quiz_resp_ans.timeTaken,
		});
		
		if (error) {
			alert(error);
		} else {
			setFinishedGrading(true)
		}
	}

	return finishedGrading ? true : null;

};
export default CalculateScore;
