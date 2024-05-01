import React from 'react';
import { useNavigate } from 'react-router-dom';

function Intro() {
  const navigate = useNavigate();

  const handleNavigateToQuestions = () => {
    navigate('/questions');
  };

  return (
    <div>
      <div>hello</div>
      <button
        type="button"
        onClick={handleNavigateToQuestions}
      >Go to Questions
      </button>
    </div>
  );
}

export default Intro;
