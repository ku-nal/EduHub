import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/TestList.css';
import Navbar from '../../../../Components/NavBar';
import { useSelector } from 'react-redux';

const TestList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let studentId = searchParams.get('studentId');
  let courseId = searchParams.get('courseId');
  const [tests, setTests] = useState([]);
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
    const fetchData = async () => {
      try {
        const response = await axios.get(`${deployedLink}/tests/getAll/${courseId}`);
        setTests(response.data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    if (courseId) {
      fetchData();
    }
  }, [courseId]);

  const handleStartTest = (test) => {
    navigate(`/start-test?studentId=${studentId}&testId=${test.id}`);
  };

  return (
    <div>
      <Navbar pages={["My Courses", "Chapters", "Live Tests","Results"]} />
      <div className="test-list">
        <h1 className="test-list-heading">Available Tests for {firstName}</h1>
        <div className="test-items-container">
          {tests.map((test) => (
            <div className="test-item" key={test.id}>
              <div className="test-name-column">
                <h3>{test.testName}</h3>
              </div>
              <div className="test-details-column">
                <p>Chapters: {test.chapterIds.join(', ')}</p>
                <p>Subchapters: {test.subchapterIds.join(', ')}</p>
                <p>Difficulty: {test.difficultyLevel}</p>
              </div>
              <div className="test-other-details-column">
                <p>Number of Questions: {test.numberOfQuestions}</p>
                <p>Time Limit: {test.testTime} minutes</p>
              </div>
              <div className="test-start-button-column">
                <button className="start-test-btn" onClick={() => handleStartTest(test)}>Start Test</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestList;
