const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');

const Respondent = require('../models/respondent.models');
const Quiz = require('../models/quiz.models');
const Employer = require('../models/employer.models');

// Route to create the candidate taking the quiz
router.post('/userInfo/:hashKey/quiz/:quizId', [
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
        .isEmpty(),
    check('email', 'Please confirm your email the quiz was sent to')
        .not()
        .isEmpty()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, school, dateOfBirth, email } = req.body;

    try {
        let quiz = await Quiz.findById(req.params.quizId);
        let respondentQuiz = await Respondent.findOne(
            { quizzes: { $elemMatch: { hashKey: req.params.hashKey } } },
            { quizzes: { $elemMatch: { quiz_id: quiz._id } } }
        );

        console.log(respondentQuiz);

        if(respondentQuiz) {
            return res.status(400).json({ msg: 'You have already submitted this quiz' });
        }

        const respondent = await Respondent.findOne({ email: email });

        if(respondent) {
            await Respondent.findByIdAndUpdate(
                respondent._id,
                { $push: {
                    quizzes: {
                        hashKey: req.params.hashKey
                    }
                }}
            );
            res.status(200).end();
        } else {
            let respondent = new Respondent({
                firstName,
                lastName,
                school,
                dateOfBirth,
                email,
                quizzes: [{
                    hashKey: req.params.hashKey
                }]
            })

            await respondent.save();
            res.status(200).end();
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: err.message });
    }
});

// Route to load the candidate info during taking the quiz
router.get('/takeQuiz/:hashKey/quiz/:quizId', async(req, res) => {
    const hashKey = req.params.hashKey;

    try {
        let quiz = await Quiz.findById(req.params.quizId);
        let respondent = await Respondent.findOne({ quizzes: { hashKey: hashKey } });

        if(!respondent) {
            return res.status(400).json({ msg: 'Candidate info not found' });
        }

        res.status(200).json({ respondent: respondent, quiz_resp: quiz });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// Route to update the quiz data with the candidate's answers
router.patch('/takeQuiz/:hashKey/quiz/:quizId', async(req, res) => {
    const { timeTaken, questionsAnswered } = req.body;
    const hashKey = req.params.hashKey;

    try {
        let user = await Respondent.findOne({ quizzes: { hashKey } });
        // let employer = await Quiz.findById(req.params.quizId);
        // let employerEmail = await Employer.findById(employer.employer_id);

        await Respondent.findByIdAndUpdate(
            user,
            { $pull: {
                quizzes: {
                    hashKey: hashKey,
                    questionsAnswered: { $exists: true, $size: 0 }
                }
            }}, { new: true }
        );

        await Respondent.findByIdAndUpdate(
            user,
            { $push: 
                { 
                    quizzes: {
                        hashKey: hashKey,
                        quiz_id: req.params.quizId,
                        timeTaken: timeTaken, 
                        questionsAnswered: questionsAnswered,
                    },
                }
            },
            { new: true }
        );

        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth:{
        //         user: "quizbanana467@gmail.com",
        //         pass: "OSUcapston1111"
        //     }
        // })
    
        // const mailOptions = {
        //     from: "quizbanana467@gmail.com",
        //     to: employerEmail,
        //     subject: `Quiz ${req.params.quizId} completed!`,
        //     text: `Quiz ${req.params.quizId} has been completed by ${user.firstName} ${user.lastName}`
        // }
    
        // transporter.sendMail(mailOptions, (error, info) =>{
        //     if(error){
        //         console.log(error);
        //         res.json({msg: 'fail'});
        //     }else{
        //         console.log("good")
        //         res.json({msg: 'success'});
    
        //     }
        // })

        res.status(202).end();
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: err.message });
    }
});

//get all respondents
router.get("/quiz/:quizId", async (req, res) => {
	try {
		let quiz = await Quiz.findById(req.params.quizId);

        let respondents = await Respondent.find({
            'quizzes._id': req.params.quizId
        })
        res.status(200).json(respondents);
		// res.status(200).json({ respondents: respondents, quiz_resp: quiz });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: "Server Error" });
	}
});

module.exports = router;