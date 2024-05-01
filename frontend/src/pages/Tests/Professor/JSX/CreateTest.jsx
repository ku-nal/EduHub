import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Snackbar, Modal, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import '../CSS/CreateTestPage.css';
import { useSelector } from 'react-redux';
import NavBar from '../../../../Components/NavBar.jsx';

const CreateTest = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let userId = searchParams.get('userId');
  let courseId = searchParams.get('courseId');

  const [difficulty, setDifficulty] = useState('');
  const [chapterIds, setChapterIds] = useState('');
  const [subchapterIds, setSubchapterIds] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [testName, setTestName] = useState('');
  const [createdTests, setCreatedTests] = useState({ data: [], loading: true });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalDifficulty, setModalDifficulty] = useState('');
  const [modalChapterIds, setModalChapterIds] = useState('');
  const [modalSubchapterIds, setModalSubchapterIds] = useState('');
  const [modalTimeLimit, setModalTimeLimit] = useState('');
  const [modalNumQuestions, setModalNumQuestions] = useState('');
  const [modalTestName, setModalTestName] = useState('');
  const [selectedTestId, setSelectedTestId] = useState('');
  const [selectedTestDetails, setSelectedTestDetails] = useState({});
  const deployedLink = `https://testbackend-sy5g.onrender.com`;
  const firstName = useSelector((state) => state.userSlice.firstName);
  const LastName = useSelector((state) => state.userSlice.lastName);
  
  if(userId == null)
  {
      userId = useSelector((state) => state.userSlice.userId)
  }
  if(courseId === null)
  {
    courseId = sessionStorage.getItem("courseId");
  }
  console.log("Course ID from session storage:", courseId);


  console.log(userId, firstName, LastName)

  useEffect(() => {

    axios.get(`${deployedLink}/tests/getAll/${userId}/${courseId}`)
      .then(response => {
        setCreatedTests({ data: response.data, loading: false });
      })
      .catch(error => {
        console.error('Error fetching created tests:', error);
      });
  }, [userId, courseId]);

  const updateCreatedTests = (updatedTests) => {
    setCreatedTests({ data: updatedTests, loading: false });
  };

  const handleCreateTest = () => {
    const test = {
      userId,
      courseId,
      chapterIds: chapterIds.split(',').map(id => id.trim()),
      subchapterIds: subchapterIds.split(',').map(id => id.trim()),
      testTime: parseInt(timeLimit),
      numberOfQuestions: parseInt(numQuestions),
      difficultyLevel: difficulty,
      testName
    };

    if (!difficulty || !chapterIds || !subchapterIds || !timeLimit || !numQuestions || !testName) {
      alert('Please fill in all fields.');
      return;
    }
    if (parseInt(timeLimit) <= 0 || parseInt(numQuestions) <= 0) {
      alert('Time limit and number of questions must be greater than 0.');
      return;
    }

    axios.post(`${deployedLink}/tests/createTest`, test)
      .then(response => {
        console.log('Test created successfully:', response.data);
        updateCreatedTests([...createdTests.data, response.data]);
        setDifficulty('');
        setChapterIds('');
        setSubchapterIds('');
        setTimeLimit('');
        setNumQuestions('');
        setTestName('');
        setSnackbarOpen(true);
      })
      .catch(error => {
        console.error('Error creating test:', error);
      });
  };

  const handleEditTest = (testId) => {
    setSelectedTestId(testId);
    axios.get(`${deployedLink}/tests/getTest/${testId}`)
      .then(response => {
        setSelectedTestDetails(response.data);
        setModalDifficulty(response.data.difficultyLevel || '');
        setModalChapterIds(response.data.chapterIds.join(', ') || '');
        setModalSubchapterIds(response.data.subchapterIds.join(', ') || '');
        setModalTimeLimit(response.data.testTime.toString() || '');
        setModalNumQuestions(response.data.numberOfQuestions.toString() || '');
        setModalTestName(response.data.testName || '');
        setEditModalOpen(true);
      })
      .catch(error => {
        console.error('Error fetching test details for editing:', error);
      });
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedTestId('');
    setSelectedTestDetails({});
  };

  const handleUpdateTest = () => {
    const updatedTest = {
      id: selectedTestId,
      userId,
      courseId,
      chapterIds: modalChapterIds.split(',').map(id => id.trim()),
      subchapterIds: modalSubchapterIds.split(',').map(id => id.trim()),
      testTime: parseInt(modalTimeLimit),
      numberOfQuestions: parseInt(modalNumQuestions),
      difficultyLevel: modalDifficulty,
      testName: modalTestName
    };
    if (!modalDifficulty || !modalChapterIds || !modalSubchapterIds || !modalTimeLimit || !modalNumQuestions || !modalTestName) {
      alert('Please fill in all fields.');
      return;
    }
    if (parseInt(modalTimeLimit) <= 0 || parseInt(modalNumQuestions) <= 0) {
      alert('Time limit and number of questions must be greater than 0.');
      return;
    }
    axios.put(`${deployedLink}/tests/update/${selectedTestId}`, updatedTest)
      .then(response => {
        console.log('Test updated successfully:', response.data);
        const updatedTests = createdTests.data.map(test => {
          if (test.id === selectedTestId) {
            return response.data;
          }
          return test;
        });
        updateCreatedTests(updatedTests);
        setEditModalOpen(false);
        setSnackbarOpen(true);
      })
      .catch(error => {
        console.error('Error updating test:', error);
      });
  };

  const handleDeleteTest = (testId) => {
    axios.delete(`${deployedLink}/tests/delete/${testId}`)
      .then(response => {
        console.log('Test deleted successfully:', response.data);
        const updatedTests = createdTests.data.filter(test => test.id !== testId);
        updateCreatedTests(updatedTests);
        setSnackbarOpen(true);
      })
      .catch(error => {
        console.error('Error deleting test:', error);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <NavBar pages = {["Courses Dashboard", "Content", "Question Bank", "Tests"]}/>
      <div className="create-test-container">
        <h1> Handle your test here {firstName}</h1>
        <h1>Create Test</h1>
        <div className="form">
          <div className="form-row">
            <div className="form-item">
              <label style={{ fontWeight: 'bold' }}>Difficulty:</label>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="">Select Difficulty</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="form-item">
              <label style={{ fontWeight: 'bold' }}>Chapters:</label>
              <input type="text" value={chapterIds} onChange={(e) => setChapterIds(e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <label style={{ fontWeight: 'bold' }}>Subchapters:</label>
              <input type="text" value={subchapterIds} onChange={(e) => setSubchapterIds(e.target.value)} />
            </div>
            <div className="form-item">
              <label style={{ fontWeight: 'bold' }}>Time Limit (minutes):</label>
              <input type="number" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <label style={{ fontWeight: 'bold' }}>Number of Questions:</label>
              <input type="number" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} />
            </div>
            <div className="form-item">
              <label style={{ fontWeight: 'bold' }}>Test Name:</label>
              <input type="text" value={testName} onChange={(e) => setTestName(e.target.value)} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={{ backgroundColor: "#282C34", margin: '20px' }} variant="contained" color="primary" onClick={handleCreateTest}>Create Test</Button>
          </div>
        </div>
        <Snackbar
          open={snackbarOpen}
          message="Operation Successful"
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
        />
      </div>
      <div className="created-tests">
        <h1 style={{ fontWeight: 'bold' }}>Already Created Tests</h1>
        {createdTests.loading ? (
          <CircularProgress />
        ) : !createdTests.data || createdTests.data.length === 0 ? (
          <p>No test created for this course, create one</p>
        ) : (
          createdTests.data.map(test => (
            <div key={test.id} className="test-item">
              <p style={{ fontWeight: 'bold' }}>{test.testName}</p>
              <div className="test-actions">
                <Button onClick={() => handleEditTest(test.id)}>
                  <EditIcon style={{ color: '#282C34' }} />
                </Button>
                <Button onClick={() => handleDeleteTest(test.id)}>
                  <DeleteIcon style={{ color: '#282C34' }} />
                </Button>
              </div>
            </div>
          ))
        )}

      </div>
      <Modal open={editModalOpen} onClose={handleEditModalClose}>
        <div className="edit-test-modal" style={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px', padding: '20px' }}>
          <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>View and Edit Test</h1>
          <div className="form">
            <div className="form-row">
              <div className="form-item">
                <label style={{ fontWeight: 'bold' }}>Difficulty:</label>
                <select value={modalDifficulty} onChange={(e) => setModalDifficulty(e.target.value)}>
                  <option value="">Select Difficulty</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="form-item">
                <label style={{ fontWeight: 'bold' }}>Chapters:</label>
                <input type="text" value={modalChapterIds} onChange={(e) => setModalChapterIds(e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <label style={{ fontWeight: 'bold' }}>Subchapters:</label>
                <input type="text" value={modalSubchapterIds} onChange={(e) => setModalSubchapterIds(e.target.value)} />
              </div>
              <div className="form-item">
                <label style={{ fontWeight: 'bold' }}>Time Limit (minutes):</label>
                <input type="number" value={modalTimeLimit} onChange={(e) => setModalTimeLimit(e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <label style={{ fontWeight: 'bold' }}>Number of Questions:</label>
                <input type="number" value={modalNumQuestions} onChange={(e) => setModalNumQuestions(e.target.value)} />
              </div>
              <div className="form-item">
                <label style={{ fontWeight: 'bold' }}>Test Name:</label>
                <input type="text" value={modalTestName} onChange={(e) => setModalTestName(e.target.value)} />
              </div>
            </div>
            <div className="form-row" style={{ justifyContent: 'center' }}>
              <Button style={{ backgroundColor: "#333", margin: '10px', color: "white" }} stylevariant="contained" color="primary" onClick={handleUpdateTest}>Update Test</Button>
              <Button style={{ backgroundColor: "#510302", margin: '10px' }} variant="contained" color="secondary" onClick={handleEditModalClose}>Back</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateTest;
