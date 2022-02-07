const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    Question: [String],
    employer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer'
    },
    // questions: [{
    //     question_id: mongoose.Types.ObjectId,
    //     question: {
    //         type: String,
    //         required: true
    //     },
    //     questionType: {
    //         type: String,
    //         required: true
    //     },
    //     answerOptions: [String],
    //     points: {
    //         type: Number,
    //         required: true
    //     },
    //     answer: [String]
    // }],
    // timeLimit: Number,
    // totalScore: Number
}, { timestamps: true });

module.exports = mongoose.model('Quiz', QuizSchema);