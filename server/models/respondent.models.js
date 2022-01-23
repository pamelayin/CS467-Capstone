const mongoose = require('mongoose');

const RespondentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    score: Number,
    email: {
        type: String,
        required: true,
        unique: true
    },
    quizzes: [{
        quiz_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz', 
        },
        questionsAnswered: [{
            question_id: mongoose.Types.ObjectId,
            answerGiven: String
        }]
    }]
}, { timestamps: true });

module.exports = mongoose.model('Respondent', RespondentSchema);