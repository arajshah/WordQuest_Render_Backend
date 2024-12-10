import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';

function Tutorial() {
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:4000/tutorial')
      .then(res => res.json())
      .then(data => setSteps(data));
  }, []);

  if (steps.length === 0) return <p>Loading tutorial...</p>;

  const currentStep = steps[currentStepIndex];

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  return (
    <div>
      <h2>Tutorial</h2>
      <p>{currentStep.text}</p>
      {currentStepIndex < steps.length - 1 ? (
        <button onClick={nextStep}>Next</button>
      ) : (
        <p>You have completed the tutorial!</p>
      )}
      <p><BackButton/></p>
    </div>
  );
}

export default Tutorial;
