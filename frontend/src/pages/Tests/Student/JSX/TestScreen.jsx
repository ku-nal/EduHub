import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/TestScreen.css';
import { useSelector } from 'react-redux';

const TestScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let studentId = searchParams.get('studentId');
  const testId = searchParams.get('testId');
  const [testInfo, setTestInfo] = useState({});
  const [questions, setQuestions] = useState([]);
  const [attemptId, setAttemptId] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showPrevious, setShowPrevious] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const firstName = useSelector((state) => state.userSlice.firstName);
  const LastName = useSelector((state) => state.userSlice.lastName);
  
  if(studentId == null)
  {
      studentId = useSelector((state) => state.userSlice.userId)
  }

  console.log(studentId, firstName, LastName)

  const deployedLink = 'https://testbackend-sy5g.onrender.com';

  useEffect(() => {
    const fetchTestInfo = async () => {
      try {
        const response = await axios.get(`${deployedLink}/tests/getTest/${testId}`);
        const testInfo = response.data;
        setTestInfo(testInfo);
        setTimeRemaining(testInfo.testTime * 60); // Convert minutes to seconds

        // Fetch questions after testInfo is available
        fetchQuestions(testInfo);
      } catch (error) {
        console.error('Error fetching test info:', error);
      }
    };

    const fetchQuestions = async (testInfo) => {
      try {
        const response = await axios.post(`${deployedLink}/launch-test`, {
          userId: studentId,
          testId: testId,
          courseId: testInfo.courseId,
          chapterIds: testInfo.chapterIds,
          subchapterIds: testInfo.subchapterIds,
          difficultyLevel: testInfo.difficultyLevel,
          numberOfQuestions: testInfo.numberOfQuestions
        });
        const testData = response.data;
        setQuestions(testData.questionsList);
        setAttemptId(testData.attemptId);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchTestInfo();
  }, [studentId, testId]);

  const handleFinishTest = async () => {
    const attemptedQuestions = questions.map((question, index) => {
      return {
        questionId: question.questionId,
        selectedOptions: selectedOptions[index] || [],
        markedForReview: markedForReview.includes(index),
      };
    });
  
    const finishTestRequest = {
      attemptId: attemptId,
      attemptedQuestions: attemptedQuestions
    };
    
    try {
      const response = await axios.post(`${deployedLink}/finish-test`, finishTestRequest);
      if (response.status === 200) {
        navigate(`/finish-test?studentId=${studentId}&courseId=${testInfo.courseId}&attemptId=${finishTestRequest.attemptId}`);
      } else {
        console.error('Failed to finish test:', response.data);
      }
    } catch (error) {
      console.error('Error finishing test:', error);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          handleFinishTest();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  
    return () => {
      clearInterval(timer);
    };
  }, [handleFinishTest]);



  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    setShowNext(true);
    if (currentQuestionIndex === 1) {
      setShowPrevious(false);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setShowPrevious(true);
    if (currentQuestionIndex === questions.length - 2) {
      setShowNext(false);
    }
  };

  const handleOptionSelect = (optionText) => {
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [currentQuestionIndex]: prevSelectedOptions[currentQuestionIndex]
        ? [...prevSelectedOptions[currentQuestionIndex], optionText]
        : [optionText]
    }));
  };

  const handleMarkForReview = () => {
    if (markedForReview.includes(currentQuestionIndex)) {
      setMarkedForReview(prev => prev.filter(index => index !== currentQuestionIndex));
    } else {
      setMarkedForReview(prev => [...prev, currentQuestionIndex]);
    }
  };

 return (
    <div className="test-screen-box">
      <h1 className="test-screen-header">{testInfo.testName}</h1>
      <div className="test-screen-info">
        <div className="time-remaining">Time Remaining: <span className="bold">{timeRemaining}</span> seconds</div>
        <button className="finish-button" onClick={handleFinishTest}>Finish Test</button>
      </div>
      <div className="test-screen-content">
        <div className="question-list">
          <h3>Questions:</h3>
          {questions.map((question, index) => (
            <button
              key={question.questionId}
              className={`question-button ${index === currentQuestionIndex ? 'active' : ''} ${markedForReview.includes(index) ? 'review' : ''}`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              Question {index + 1}
            </button>
          ))}
        </div>
        <div className="question-details">
          {questions.length > 0 && (
            <div className="question-box">
              <h3>Question: {currentQuestionIndex + 1}</h3>
              <p className="question-text">{questions[currentQuestionIndex].question}</p>
              <ul className="option-list">
                {questions[currentQuestionIndex].options.map((optionText, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      checked={selectedOptions[currentQuestionIndex]?.includes(optionText)}
                      onChange={() => handleOptionSelect(optionText)}
                    />
                    {optionText}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="navigation-buttons">
        <button className="nav-button" onClick={handlePreviousQuestion} disabled={!showPrevious}>Previous</button>
        <button className="mark-button" onClick={handleMarkForReview}>Mark for Review</button>
        <button className="nav-button" onClick={handleNextQuestion} disabled={!showNext}>Next</button>
      </div>
    </div>
  );
};

export default TestScreen;
