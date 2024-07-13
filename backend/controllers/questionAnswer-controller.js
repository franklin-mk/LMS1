//qustionAnswer-controller
const Question = require('../models/questionSchema.js');
const Answer = require('../models/answerSchema.js');

// Post a question
const postQuestion = async (req, res) => {
    const { user, userName, userType, question } = req.body;
    const newQuestion = new Question({ user, userName, userType, question });
    try {
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (err) {
        res.status(400).json({ message: "Failed to post question", error: err.message });
    }
};

// Get a specific question
const getQuestion = async (req, res) => { 
    try {
        const question = await Question.findById(req.params.id)
            .populate('user', 'name')
            .populate({
                path: 'answers',
                populate: { path: 'user', select: 'name' }
            });
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(question);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving question", error: err.message });
    }
};

// Get all questions
const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find()
            .sort({ createdAt: -1 })
            .limit(20);
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving questions", error: err.message });
    }
};

// Post an answer
const postAnswer = async (req, res) => {
    const { user, userName, userType, answer, question } = req.body;
    const newAnswer = new Answer({ user, userName, userType, answer, question });
    try {
        const savedAnswer = await newAnswer.save();
        await Question.findByIdAndUpdate(question, { $push: { answers: savedAnswer._id } });
        res.status(201).json(savedAnswer);
    } catch (err) {
        res.status(400).json({ message: "Failed to post answer", error: err.message });
    }
};

// Get answers for a specific question
const getAnswers = async (req, res) => {
    try {
        const answers = await Answer.find({ question: req.params.questionId })
            .sort({ createdAt: -1 });
        res.status(200).json(answers);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving answers", error: err.message });
    }
};

module.exports = { postQuestion, getQuestion, getAllQuestions, postAnswer, getAnswers };



/* 
const Question = require('../models/questionSchema.js');
const Answer = require('../models/answerSchema.js');

// Post a question
const postQuestion = async (req, res) => {
    const { user, userType, title, question, tags } = req.body;
    const newQuestion = new Question({ user, userType, title, question, tags });
    try {
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (err) {
        res.status(400).json({ message: "Failed to post question", error: err.message });
    }
};

// Get a specific question
const getQuestion = async (req, res) => { 
    try {
        const question = await Question.findById(req.params.id)
            .populate('user', 'name') // Assuming user has a password field we don't want to send
            .populate({
                path: 'answers',
                populate: { path: 'user', select: 'name' }
            });
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(question);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving question", error: err.message });
    }
};

// Get all questions
const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find()
            .populate('user', 'name')
            .sort({ createdAt: -1 }) // Sort by most recent first
            .limit(20); // Limit to 20 questions per page, you can make this dynamic
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving questions", error: err.message });
    }
};

// Post an answer
const postAnswer = async (req, res) => {
    const { user, userType, answer, question } = req.body;
    const newAnswer = new Answer({ user, userType, answer, question });
    try {
        const savedAnswer = await newAnswer.save();
        // Update the question to include this answer
        await Question.findByIdAndUpdate(question, { $push: { answers: savedAnswer._id } });
        res.status(201).json(savedAnswer);
    } catch (err) {
        res.status(400).json({ message: "Failed to post answer", error: err.message });
    }
};

// Get answers for a specific question
const getAnswers = async (req, res) => {
    try {
        const answers = await Answer.find({ question: req.params.questionId })
            .populate('user', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json(answers);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving answers", error: err.message });
    }
};

module.exports = { postQuestion, getQuestion, getAllQuestions, postAnswer, getAnswers };
*/