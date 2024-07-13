//questionSchema
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'userType'
        },
        userName: {
            type: String,
            required: true
        },
        userType: {
            type: String,
            required: true,
            enum: ['student', 'teacher']
        },
        question: {
            type: String,
            required: true
        },
        answers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Answer'
        }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Question', questionSchema);

/* 
const questionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'userType'
        },
        userType: {
            type: String,
            required: true,
            enum: ['student', 'teacher']
        },
        question: {
            type: String,
            required: true
        },
        answers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Answer'
        }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Question', questionSchema); 
*/