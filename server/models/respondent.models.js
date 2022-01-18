const mongoose = require('mongoose');

const RespondentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [
            true,
            'Please enter your first name.'
        ]
    },
    lastName: {
        type: String,
        required: [
            true,
            'Please enter your last name.'
        ]
    },
    school: {
        type: String,
        required: [
            true,
            'Please enter your company or organization name.'
        ]
    },
    dateOfBirth: {
        type: String,
        required: [
            true,
            'Please enter the date of birth'
        ]
    },
    score: Number,
    email: {
        type: String,
        required: [
            true,
            'Email is required.'
        ],
        unique: true,
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: 'Please enter a valid email address.'
        }
    },
    quizzes: [mongoose.Schema.Types.ObjectId]
}, { timestamps: true });

module.exports = mongoose.model('Respondent', RespondentSchema);