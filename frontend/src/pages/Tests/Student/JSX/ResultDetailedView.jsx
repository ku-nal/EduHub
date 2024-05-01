import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../../../Components/NavBar.jsx';
import '../CSS/ResultDetailedView.css';
import { useSelector } from 'react-redux';

const ResultDetailedView = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const attemptId = searchParams.get('attemptId');
  let studentId = searchParams.get('studentId');
  let courseId = searchParams.get('courseId');
  const [attempt, setAttempt] = useState(null);
  const [questionDetails, setQuestionDetails] = useState({});
  const navigate = useNavigate();
  const deployedLink = 'https://testbackend-sy5g.onrender.com';
  const firstName = useSelector((state) => state.userSlice.firstName);
  const LastName = useSelector((state) => state.userSlice.lastName);
  
  if(studentId == null)
  {
      studentId = useSelector((state) => state.userSlice.userId)
  }
  console.log(studentId, firstName, LastName)
  if(courseId === null)
  {
    courseId = sessionStorage.getItem("courseId");
  }
  console.log("Course ID from session storage:", courseId);

  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        const response = await axios.get(`${deployedLink}/getAttempt/${attemptId}`);
        setAttempt(response.data);
        await Promise.all(response.data.attemptedQuestions.map(async (question) => {
          const questionDetailsResponse = await axios.get(`${deployedLink}/qb/getQuestion/${question.questionId}`);
          setQuestionDetails(prevDetails => ({
            ...prevDetails,
            [question.questionId]: {
              question: questionDetailsResponse.data.question,
              options: questionDetailsResponse.data.options,
              correctOptions: questionDetailsResponse.data.correctOptions,
              selectedOptions: question.selectedOptions,
              positiveMarks: questionDetailsResponse.data.positiveMarks,
              negativeMarks: questionDetailsResponse.data.negativeMarks,
              solutionDescription: questionDetailsResponse.data.solutionDescription
            }
          }));
        }));
      } catch (error) {
        console.error('Error fetching attempt:', error);
      }
    };

    if (attemptId) {
      fetchAttempt();
    }
  }, [attemptId]);

  const handleBackToList = () => {
    navigate(`/result-list?studentId=${studentId}&courseId=${courseId}`);
  };

  if (!attempt) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <Navbar pages={["My Courses", "Chapters", "Live Tests","Results"]} />
      <div className="result-detailed-view-container">
      <h1>Attempt Detailed View</h1>
        <div className="result-details">
          <p>Attempt ID: {attempt.attemptId}</p>
          <p>Total Marks: {attempt.totalMarks}</p>
          <p>Obtained Marks: {attempt.obtainedMarks}</p>
          <p>Result: {attempt.result}</p>
          <h2>Questions</h2>
          {attempt.attemptedQuestions.map((question) => (
            <div key={question.questionId} className="question-details">
              <h3>Question:</h3>
              <h3>{questionDetails[question.questionId]?.question}</h3>
              <h4>Options:</h4>
              <ul>
                {questionDetails[question.questionId]?.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
              <p>Correct Options: {questionDetails[question.questionId]?.correctOptions.join(', ')}</p>
              <p>Selected Options: {questionDetails[question.questionId]?.selectedOptions.join(', ')}</p>
              <p>Positive Marks: {questionDetails[question.questionId]?.positiveMarks}</p>
              <p>Negative Marks: {questionDetails[question.questionId]?.negativeMarks}</p>
              <p>Solution Description: {questionDetails[question.questionId]?.solutionDescription}</p>
            </div>
          ))}
        </div>
        <button className="back-button" onClick={handleBackToList}>Back to Attempt List</button>
      </div>
    </div>
  );
};

export default ResultDetailedView;
