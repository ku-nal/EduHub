import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SuccessPopup from '../../../../Components/SuccessPopup.jsx';
import axios from 'axios';
import '../CSS/AddQuestionPage.css';
import NavBar from '../../../../Components/NavBar.jsx';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useSelect } from '@material-tailwind/react';

const AddQuestion = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let userId = searchParams.get('userId')
    let courseId= searchParams.get('courseId')
    const deployedLink = `https://testbackend-sy5g.onrender.com`;
    const firstName = useSelector((state) => state.userSlice.firstName);
    const LastName = useSelector((state) => state.userSlice.lastName);
    
    if(userId == null)
    {
        userId = useSelector((state) => state.userSlice.userId)
    }
  
    console.log(userId, firstName, LastName)
    if(courseId === null)
    {
      courseId = sessionStorage.getItem("courseId");
    }
    console.log("Course ID from session storage:", courseId);
  
 
    const [questionData, setQuestionData] = useState({
        userId,
        courseId,
        chapterId: '',
        subchapterId: '',
        difficulty: '',
        topic: '',
        question: '',
        options: [''],
        correctOptions: [],
        positiveMarks: 1,
        negativeMarks: 0,
        solutionDescription: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [validationError, setValidationError] = useState('');

    const handleSaveQuestion = () => {
        if (!questionData.chapterId || !questionData.subchapterId || !questionData.difficulty || !questionData.topic || !questionData.question) {
            setValidationError('All fields are required.');
            return;
        }
        if (questionData.positiveMarks < 0 || questionData.negativeMarks < 0) {
            setValidationError('Positive and negative marks should be greater than or equal to zero.');
            return;
        }
        axios.post(`${deployedLink}/qb/addQuestion`, questionData)
            .then(response => {
                console.log('Question added successfully:', response.data);
                setSuccessMessage('Question added successfully!');
            })
            .catch(error => {
                console.error('Error adding question:', error);
            });
        setQuestionData({
            userId,
            courseId,
            chapterId: '',
            subchapterId: '',
            difficulty: '',
            topic: '',
            question: '',
            options: [''],
            correctOptions: [],
            positiveMarks: '',
            negativeMarks: '',
            solutionDescription: '',
        });
    };

    const handleBackButton = () => {
        navigate(`/questionbank?userId=${userId}&courseId=${courseId}`);
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...questionData.options];
        updatedOptions[index] = value;
        setQuestionData(prevData => ({ ...prevData, options: updatedOptions }));
    };

    const handleAddOption = () => {
        setQuestionData(prevData => ({ ...prevData, options: [...prevData.options, ''] }));
    };

    const handleRemoveOption = index => {
        const updatedOptions = [...questionData.options];
        updatedOptions.splice(index, 1);
        setQuestionData(prevData => ({ ...prevData, options: updatedOptions }));
    };

    const handleClosePopup = () => {
        setSuccessMessage('');
    };

    const handleMarksChange = (field, value) => {
        if (value < 0) {
            setValidationError('Positive and negative marks should be greater than or equal to zero.');
        } else {
            setValidationError('');
        }
        setQuestionData(prevData => ({ ...prevData, [field]: Math.max(0, value) }));
    };
    

    return (
        <div>
      <NavBar pages = {["Courses Dashboard", "Content", "Question Bank", "Tests"]}/>
            <div className="add-question-container">
                <h1 className="add-question-heading">Add MCQ Question</h1>
                {validationError && <div className="error-message">{validationError}</div>}
                <form>
                    <div className="horizontal-fields-container">
                        <div className="field-container">
                            <label className="bold-label">Chapter:</label>
                            <input type="text" className="question-input" value={questionData.chapterId} onChange={e => setQuestionData(prevData => ({ ...prevData, chapterId: e.target.value }))} />
                        </div>
                        <div className="field-container">
                            <label className="bold-label">Subchapter:</label>
                            <input type="text" className="question-input" value={questionData.subchapterId} onChange={e => setQuestionData(prevData => ({ ...prevData, subchapterId: e.target.value }))} />
                        </div>
                    </div>
                    <div className="horizontal-fields-container">
                        <div className="field-container">
                            <label className="bold-label">Topic:</label>
                            <input type="text" className="question-input" value={questionData.topic} onChange={e => setQuestionData(prevData => ({ ...prevData, topic: e.target.value }))} />
                        </div>
                        <div className="field-container">
                            <label className="bold-label">Difficulty:</label>
                            <select className="question-input" value={questionData.difficulty} onChange={e => setQuestionData(prevData => ({ ...prevData, difficulty: e.target.value }))}>
                                <option value="">Select Difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="bold-label">Question:</label>
                        <textarea
                            className="question-input"
                            value={questionData.question}
                            onChange={e => setQuestionData(prevData => ({ ...prevData, question: e.target.value }))}
                            rows={4}
                        />
                    </div>
                    <div>
                        <label className="bold-label">Options:</label>
                        {questionData.options.map((option, index) => (
                            <div key={index} className="option-container">
                                <div className="option-input-wrapper">
                                    <input
                                        type="text"
                                        className="option-input"
                                        value={option}
                                        onChange={e => handleOptionChange(index, e.target.value)}
                                    />
                                </div>
                                <div className="option-control-wrapper">
                                    <input
                                        type="checkbox"
                                        className="correct-option-checkbox"
                                        checked={questionData.correctOptions.includes(option)}
                                        onChange={() => {
                                            const correctOptions = [...questionData.correctOptions];
                                            if (correctOptions.includes(option)) {
                                                const indexToRemove = correctOptions.indexOf(option);
                                                correctOptions.splice(indexToRemove, 1);
                                            } else {
                                                correctOptions.push(option);
                                            }
                                            setQuestionData(prevData => ({ ...prevData, correctOptions }));
                                        }}
                                    />
                                    <label className="correct-label">Correct</label>
                                    {index > 0 && (
                                        <FaMinus className="option-remove-icon" onClick={() => handleRemoveOption(index)} />
                                    )}
                                </div>
                            </div>
                        ))}
                        <div className="add-option-button-wrapper">
                            <FaPlus className="option-add-icon" onClick={handleAddOption} />
                        </div>
                    </div>

                    <div className="horizontal-fields-container">
                        <div className="field-container">
                            <label className="bold-label">Positive Marks:</label>
                            <input
                                type="number"
                                className="question-input"
                                value={questionData.positiveMarks}
                                onChange={e => handleMarksChange('positiveMarks', parseInt(e.target.value))}
                            />
                        </div>
                        <div className="field-container">
                            <label className="bold-label">Negative Marks:</label>
                            <input
                                type="number"
                                className="question-input"
                                value={questionData.negativeMarks}
                                onChange={e => handleMarksChange('negativeMarks', parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="bold-label">Solution Description:</label>
                        <textarea
                            className="question-input"
                            value={questionData.solutionDescription}
                            onChange={e => setQuestionData(prevData => ({ ...prevData, solutionDescription: e.target.value }))}
                            rows={6} // Adjust the number of rows
                        />
                    </div>
                    <button type="button" className="save-button" onClick={handleSaveQuestion}>Save Question</button>
                    {successMessage && <SuccessPopup message={successMessage} onClose={handleClosePopup} />}
                </form>

                <button type="button" className="back-button" onClick={handleBackButton}>Back to Question Bank</button>
                {successMessage && <SuccessPopup message={successMessage} onClose={handleClosePopup} />}
            </div>
        </div>
    );
};

export default AddQuestion;
