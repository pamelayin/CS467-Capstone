const mongoose = require('mongoose');

const EmployerSchema = new mongoose.Schema({
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
    organization: {
        type: String,
        required: [
            true,
            'Please enter your company or organization name.'
        ]
    },
    quizzes: {
        type: [mongoose.Schema.Types.ObjectId]
    },
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
    password: {
        type: String,
        required: [
            true,
            'Password of at least 8 characters is required for registering'
        ],
        minlength: 8
    }
}, { timestamps: true });

module.exports = mongoose.model('Employer', EmployerSchema);