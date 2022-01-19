const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    employer_id: mongoose.Schema.Types.ObjectId,
    questions: [{
        question: {
            type: String,
            required: [
                true,
                'Please enter a question for a quiz'
            ]
        },
        answerOptions: [String],
        points: {
            type: Number,
            required: [
                true,
                'Enter the number of points available for the question'
            ]
        },
        answer: [String]
    }],
    timeLimit: Number,
    totalScore: Number
}, { timestamps: true });

module.exports = mongoose.model('Quiz', QuizSchema);