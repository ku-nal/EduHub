import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import SuccessPopup from '../../../../Components/SuccessPopup.jsx';
import '../CSS/EditQuestionPage.css';
import { FaPlus, FaMinus } from 'react-icons/fa'; 
import { useSelector } from 'react-redux';
import NavBar from '../../../../Components/NavBar.jsx';


const EditQuestion = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let userId = searchParams.get('userId')
    let courseId= searchParams.get('courseId')
    const questionId = searchParams.get('questionId')
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
        userId: userId,
        courseId: courseId,
        questionId: '',
        chapterId: '',
        subchapterId: '',
        difficulty: '',
        topic: '',
        question: '',
        options: [],
        correctOptions: [],
        positiveMarks: 1,
        negativeMarks: 0,
        solutionDescription: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        // Fetch question data
        axios.get(`${deployedLink}/qb/getQuestion/${questionId}`)
            .then(response => {
                setQuestionData(response.data);
            })
            .catch(error => {
                console.error('Error fetching question data:', error);
            });
    }, [questionId]);

    const handleUpdateQuestion = () => {
        // Null check for required fields
        if (!questionData.chapterId || !questionData.subchapterId || !questionData.difficulty || !questionData.topic || !questionData.question) {
            setValidationError('All fields are required.');
            return;
        }
    
        // Positive and negative marks should be greater than or equal to zero
        if (questionData.positiveMarks < 0 || questionData.negativeMarks < 0) {
            setValidationError('Positive and negative marks should be greater than or equal to zero.');
            return;
        }
    
        // Send PUT request to update the question
        axios.put(`${deployedLink}/qb/updateQuestion/${questionId}`, questionData)
            .then(response => {
                console.log('Question updated successfully:', response.data);
                setSuccessMessage('Question updated successfully!');
            })
            .catch(error => {
                console.error('Error updating question:', error);
            });
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuestionData({ ...questionData, [name]: value });
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...questionData.options];
        updatedOptions[index] = value;
        setQuestionData({ ...questionData, options: updatedOptions });
    };

    const handleCheckboxChange = (index) => {
        const updatedCorrectOptions = [...questionData.correctOptions]; // Create a copy of correctOptions
        const optionIndex = updatedCorrectOptions.indexOf(questionData.options[index]); // Check if the current option value exists in correctOptions
    
        if (optionIndex !== -1) {
            // If the option value is found, remove it from the array
            updatedCorrectOptions.splice(optionIndex, 1);
        } else {
            // If not found, add it to the array
            updatedCorrectOptions.push(questionData.options[index]);
        }
    
        // Update the state with the new correctOptions array
        setQuestionData({ ...questionData, correctOptions: updatedCorrectOptions });
    };
    
    

    const handleAddOption = () => {
        const updatedOptions = [...questionData.options, ''];
        setQuestionData({ ...questionData, options: updatedOptions });
    };

    const handleDeleteOption = (index) => {
        const updatedOptions = [...questionData.options];
        updatedOptions.splice(index, 1);
        setQuestionData({ ...questionData, options: updatedOptions });
    };

    const handleClosePopup = () => {
        setSuccessMessage('');
    };

    const handleBackButton = () => {
        navigate(`/questionbank?userId=${userId}&courseId=${courseId}`);
    }

    return (
        <div>
      <NavBar pages = {["Courses Dashboard", "Content", "Question Bank", "Tests"]}/>
        <div className="edit-question-container">
            <h1 className="edit-question-heading">Edit MCQ Question</h1>
            {validationError && <div className="error-message">{validationError}</div>}
            <form>
                <div className="field-container">
                    <label>Chapter:</label>
                    <input type="text" className="question-input" name="chapterId" value={questionData.chapterId} onChange={handleInputChange} />
                </div>
                <div className="field-container">
                    <label>Subchapter:</label>
                    <input type="text" className="question-input" name="subchapterId" value={questionData.subchapterId} onChange={handleInputChange} />
                </div>
                <div className="field-container">
                    <label>Topic:</label>
                    <input type="text" className="question-input" name="topic" value={questionData.topic} onChange={handleInputChange} />
                </div>
                <div className="field-container">
                    <label>Difficulty:</label>
                    <select className="question-input" name="difficulty" value={questionData.difficulty} onChange={handleInputChange}>
                        <option value="">Select Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className="field-container">
                    <label>Question:</label>
                    <input type="text" className="question-input" name="question" value={questionData.question} onChange={handleInputChange} />
                </div>
                <div className="field-container">
                    <label>Options:</label>
                    {questionData.options.map((option, index) => (
                        <div key={index} className="option-container">
                            <input type="checkbox" checked={questionData.correctOptions.includes(index)} onChange={() => handleCheckboxChange(index)} />
                            <input type="text" className="option-input" value={option} onChange={e => handleOptionChange(index, e.target.value)} />
                            <button type="button" className="option-delete-button" onClick={() => handleDeleteOption(index)}>−</button>
                        </div>
                    ))}
                </div>
                <div className="add-option-button-wrapper">
                            <FaPlus className="option-add-icon" onClick={handleAddOption} />
                        </div>
                <div className="field-container">
                    <label>Solution Description:</label>
                    <input type="text" className="question-input" name="solutionDescription" value={questionData.solutionDescription} onChange={handleInputChange} />
                </div>
                <div className="field-container">
                    <label>Positive Marks:</label>
                    <input type="number" className="question-input" name="positiveMarks" value={questionData.positiveMarks} onChange={handleInputChange} />
                </div>
                <div className="field-container">
                    <label>Negative Marks:</label>
                    <input type="number" className="question-input" name="negativeMarks" value={questionData.negativeMarks} onChange={handleInputChange} />
                </div>
                <button type="button" className="save-button" onClick={handleUpdateQuestion}>Update Question</button>
                {successMessage && <SuccessPopup message={successMessage} onClose={handleClosePopup} />}
            </form>

            <button type="button" className="back-button" onClick={handleBackButton}>Back to Question Bank</button>
            {successMessage && <SuccessPopup message={successMessage} onClose={handleClosePopup} />}
        </div>
        </div>
    );
};

export default EditQuestion;
