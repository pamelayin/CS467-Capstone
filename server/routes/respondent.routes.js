const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Respondent = require('../models/respondent.models');
const Quiz = require('../models/quiz.models');

router.patch('/userInfo/:userId/quiz/:quizId', [
    check('firstName', 'Appropriately enter your first name with a min of 2 characters and a max of 30')
        .not()
        .isEmpty()
        .withMessage('Please enter your first name')
        .isAlpha('en-US',{ignore: ' '})
        .withMessage('Only characters are allowed for your first and last name')
        .isLength({ min: 1, max: 30})
        .withMessage('A min length of 2 characters and a max of 30 characters is required for your first and last name'),
    check('lastName', 'Appropriately enter your last name with a min of 2 characters and a max of 30')
        .not()
        .isEmpty()
        .withMessage('Please enter your last name')
        .isAlpha('en-US',{ignore: ' '})
        .withMessage('Only characters are allowed for your first and last name')
        .isLength({ min: 1, max: 30})
        .withMessage('A min length of 1 character and a max of 30 characters is required for your first and last name'),
    check('school', 'Please enter your school name')
        .not()
        .isEmpty(),
    check('dateOfBirth', 'Please enter your date of birth')
        .not()
        .isEmpty()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let quiz = await Quiz.findById(req.params.quizId);
        // // let respondent = await Respondent.findById(req.params.userId);
        // let respondentQuiz = await Respondent.findOne(
        //     { _id: req.params.userId },
        //     { quizzes: { $elemMatch: { quiz_id: quiz._id } } }
        // );

        // if(respondentQuiz) {
        //     return res.status(400).json({ msg: 'You have already submitted this quiz' });
        // }

        const respondentEdits = {};
		respondentEdits.firstName = req.body.firstName;
		respondentEdits.lastName = req.body.lastName;
		respondentEdits.school = req.body.school;
        respondentEdits.dateOfBirth = req.body.dateOfBirth;

        await Respondent.findByIdAndUpdate(
            req.params.userId,
            { $set: respondentEdits },
            { new: true }
        );

        await Respondent.findByIdAndUpdate(
            req.params.userId,
            { $push: { quizzes: quiz._id } },
            { new: true }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: err.message });
    }
});

router.get('/user/:userId/quiz/:quizId', async(req, res) => {
    try {
        let quiz = await Quiz.findById(req.params.quizId);
        let respondent = await Respondent.findById(req.params.userId);

        res.status(200).json({ respondent: respondent, quiz: quiz });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

router.patch('/user/:userId/quiz/:quizId', async(req, res) => {
    const { quizzes } = req.body;

    try {
        let user = await Respondent.findById(req.params.userId)

        await Respondent.findByIdAndUpdate(
            user,
            { $push: { "quizzes": quizzes } },
            { new: true }
        );

        res.status(202).end();
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;