const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Quiz = require('../models/quiz.models');

router.get("/", auth, async (req, res) => {
    try {
        const quizzes = await Quiz.find({ "employer_id": req.user.id }).sort({ "createdAt": -1 });
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

module.exports = router;
