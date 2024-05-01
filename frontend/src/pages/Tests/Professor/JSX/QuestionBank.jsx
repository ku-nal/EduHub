import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, Snackbar } from '@mui/material';
import '../CSS/QuestionPage.css';
import NavBar from '../../../../Components/NavBar.jsx';

const QuestionBank = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deletedQuestionId, setDeletedQuestionId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTopic, setFilterTopic] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); 
  const navigate = useNavigate();
  const [allTopics, setAllTopics] = useState([]);
  const [allDifficulties, setAllDifficulties] = useState([]);
  const params = new URLSearchParams(location.search);
  let userId = params.get('userId');
  let courseId = params.get('courseId');
  const deployedLink = `https://testbackend-sy5g.onrender.com`;
  const firstName = useSelector((state) => state.userSlice.firstName);
  const LastName = useSelector((state) => state.userSlice.lastName);

  if(userId === null)
  {
      userId = useSelector((state) => state.userSlice.userId)
  }
  console.log(userId, firstName, LastName)
  if(courseId === null)
  {
    courseId = sessionStorage.getItem("courseId");
  }
  console.log("Course ID from session storage:", courseId);

  useEffect(() => {

    axios.get(`${deployedLink}/qb/getAllQuestions/${userId}/${courseId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        const allQues = response.data;
        setQuestions(allQues);
        setLoading(false);
        
        const uniqueTopics = [...new Set(allQues.map(q => q.topic))];
        const uniqueDifficulties = [...new Set(allQues.map(q => q.difficulty))];

        setAllTopics(uniqueTopics);
        setAllDifficulties(uniqueDifficulties);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        setLoading(false);
      });
  }, [location.search]); 

  const handleDeleteQuestion = (id) => {
    setDeletedQuestionId(id);
    setSnackbarOpen(true);
  };

  const handleConfirmDelete = () => {
    axios.delete(`${deployedLink}/qb/deleteQuestion/${deletedQuestionId}`)
      .then(response => {
        console.log("Question deleted successfully:", response.data);
        setQuestions(questions.filter(q => q.questionId !== deletedQuestionId));
      })
      .catch(error => {
        console.error('Error deleting question:', error);
      });
    setSnackbarOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const filteredQuestions = questions.filter(q => {
    return (
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterTopic === '' || q.topic === filterTopic) &&
      (filterDifficulty === '' || q.difficulty === filterDifficulty)
    );
  });

  const handleEditQuestion = (questionId, userId, courseId) => {
    navigate(`/editquestion?questionId=${questionId}&userId=${userId}&courseId=${courseId}`);
  };

  return (
    <div>
      <NavBar pages = {["Courses Dashboard", "Content", "Question Bank", "Tests"]}/>
      <div className="question-bank-container">
      <h1 style={{ marginTop: "2rem" }}>Hi {firstName}, this is Question Bank for this course</h1>
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <div className="filter-options">
          <select value={filterTopic} onChange={(e) => setFilterTopic(e.target.value)}>
            <option value="">All Topics</option>
            {allTopics.map((topic, index) => (
              <option key={index} value={topic}>{topic}</option>
            ))}
          </select>
          <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)}>
            <option value="">All Difficulties</option>
            {allDifficulties.map((difficulty, index) => (
              <option key={index} value={difficulty}>{difficulty}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {filteredQuestions.length === 0 ? (
              <div>
                <p>No questions found.</p>
              </div>
            ) : (
              <div className="question-list">
                {filteredQuestions.map((question, index) => (
                  <div key={index} className="question-item">
                    <p>{question.question}</p>
                    <div className="question-actions">
                      <FaEdit className="action-icon" onClick={() => handleEditQuestion(question.questionId, userId, courseId)} />
                      <FaTrash className="action-icon" onClick={() => handleDeleteQuestion(question.questionId)} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        
        <Link
          to={`/addquestion?userId=${userId}&courseId=${courseId}`}
          className="add-question-btn"
        >
          <FaPlus className="add-icon" />
        </Link>

        <Snackbar
          open={snackbarOpen}
          message="Are you sure you want to delete this question?"
          action={
            <>
              <Button style={{ color: 'white' }} size="small" onClick={handleConfirmDelete}>
                Yes
              </Button>
              <Button style={{ color: 'white' }} size="small" onClick={handleSnackbarClose}>
                No
              </Button>
            </>
          }
        />
      </div>
    </div>
  );
};

export default QuestionBank;
