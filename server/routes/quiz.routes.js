const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { check, validationResult } = require('express-validator');

const Employer = require('../models/employer.models');
const Quiz = require('../models/quiz.models');

router.get("/", auth, async (req, res) => {
    try {
        const quizzes = await Quiz.find({ "employee_id": req.user.id }).sort({ "createdAt": -1 });
		res.json(quizzes);
		console.log(quizzes);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: "Server Error" });
	}
});

router.get("/:id", auth, async (req, res) => {
	try {
		const quiz = await Quiz.findById(req.params.id);
		res.json(quiz);
		console.log(quiz);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: "Server Error" });
	}
});

router.delete("/:id", auth, async (req, res) => {
	try {
		await Quiz.findByIdAndDelete(req.params.id);

        res.json({ msg: "Quiz has been deleted." });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: "Server Error" });
	}
});

// Create Quiz
router.post('/', auth, 
// [
//     check('title', 'Title of quiz is required').not().isEmpty(),
//     check('questions.*.question').not().isEmpty(),
//     check('questions.*.answerOptions').isArray().not().isEmpty(),
//     check('questions.*.points').not().isEmpty(),
//     check('questions.*.answer').not().isEmpty(),
//     check('timeLimit').not().isEmpty(),
//     check('totalScore').not().isEmpty()],
    async(req, res) => {
        // const errors = validationResult(req);
        // if(!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        // const { title, questions, timeLimit, totalScore } = req.body;

        try {
            // let quesArr = [];

            // for(q of questions) {
            //     const questionsObj= {
            //         question: q.question,
            //         answerOptions: q.answerOptions,
            //         points: q.points,
            //         answer: q.answer
            //     }
            //     quesArr.push(questionsObj)
            // }

            // const newQuiz = new Quiz({
            //     title,
            //     questions: quesArr,
            //     timeLimit,
            //     totalScore,
            //     employee_id: req.user.id
            // });

            const newQuiz = new Quiz({
                Question: req.body
            })

            const quiz = await newQuiz.save();

            const updateUser = await Employer.findByIdAndUpdate(
                req.user.id,
                { $push: { "quizzes": quiz._id } }, { new: true }
            );

            console.log(updateUser);
            res.status(201).json(quiz);

        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: err.message });
        }
    }
);

module.exports = router;
