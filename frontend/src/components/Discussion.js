import React, { useEffect, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import axios from "axios";
import { useSelector } from 'react-redux';

const Discussion = ({ role, name }) => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [toggledQuestionId, setToggledQuestionId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [answer, setAnswer] = useState('');

  const baseURL = process.env.REACT_APP_BASE_URL;
  const userId = '668b8db72f4aa2256ebe1fbd'; // Replace with actual user ID from your auth system

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${baseURL}/Questions`);
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question.trim()) {
      try {
        const response = await axios.post(`${baseURL}/QuestionCreate`, {
          user: userId,
          userName: name,
          userType: role,
          question: question
        });
        setQuestions(prevQuestions => [response.data, ...prevQuestions]);
        setQuestion('');
      } catch (error) {
        console.error("Error posting question:", error);
      }
    }
  };

  const toggleAnswersPanel = async (questionId) => {
    setToggledQuestionId(prevId => prevId === questionId ? null : questionId);
    if (!answers[questionId]) {
      try {
        const response = await axios.get(`${baseURL}/AnswerList/${questionId}/answers`);
        setAnswers(prevAnswers => ({...prevAnswers, [questionId]: response.data}));
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    }
  }

  const handleAnswerSubmit = async (e, questionId) => {
    e.preventDefault();
    if (answer.trim()) {
      try {
        const response = await axios.post(`${baseURL}/AnswerCreate`, {
          user: userId,
          userName: name,
          userType: role,
          answer: answer,
          question: questionId
        });
        setAnswers(prevAnswers => ({
          ...prevAnswers,
          [questionId]: [...(prevAnswers[questionId] || []), response.data]
        }));
        setAnswer('');
      } catch (error) {
        console.error("Error posting answer:", error);
      }
    }
  };

  return (
    <div className='some-margin'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Write Your Question Below:
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="form-control"
              rows="4"
              required
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Post Question
        </button>
      </form>

      <div className="mt-4">
        <h3 className='center-text'>Recent Questions:</h3>
        {questions.map((q) => (
          <div className='mapped-questions' key={q._id}>
            <div className="questionCard">
              <div className="card-body">
                <h5 className="card-title">{q.userName} ({q.userType})</h5>
                <p className="card-text">{q.question}</p>
                <small className="text-muted">
                  {new Date(q.createdAt).toLocaleString()}
                </small>

                <div onClick={() => toggleAnswersPanel(q._id)} className="toggleAnswers">
                  <ChatIcon /> 
                  <p>Answers</p>
                </div>
              </div>
            </div>

            {toggledQuestionId === q._id && (
              <div className="answersPanel">
                {answers[q._id] && answers[q._id].map((a) => (
                  <div key={a._id} className="answerCard">
                    <h6>{a.userName} ({a.userType})</h6>
                    <p>{a.answer}</p>
                    <small>{new Date(a.createdAt).toLocaleString()}</small>
                  </div>
                ))}
                <form onSubmit={(e) => handleAnswerSubmit(e, q._id)}>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="form-control"
                    rows="2"
                    required
                  />
                  <button type="submit" className="btn btn-secondary mt-2">
                    Submit Answer
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discussion;