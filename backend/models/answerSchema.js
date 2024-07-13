//answerSchema
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
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
        answer: {
            type: String,
            required: true
        },
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Answer', answerSchema);

/* 
const answerSchema = new mongoose.Schema(
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
        answer: {
            type: String,
            required: true
        },
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Answer', answerSchema);
*/