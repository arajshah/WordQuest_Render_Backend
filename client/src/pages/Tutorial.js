import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BackButton from '../components/BackButton';

const Container = styled.div`
  text-align: center;
  padding: 20px;
  background: linear-gradient(to right, #ffecd2, #fcb69f);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
`;

const StepText = styled.p`
  font-size: 1.5em;
  color: #555;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin-bottom: 20px;
`;

const NextButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2em;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-bottom: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

const CompletionText = styled.p`
  font-size: 1.5em;
  color: #333;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
`;

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
    <Container>
      <Title>Tutorial</Title>
      <StepText>{currentStep.text}</StepText>
      {currentStepIndex < steps.length - 1 ? (
        <NextButton onClick={nextStep}>Next</NextButton>
      ) : (
        <CompletionText>You have completed the tutorial!</CompletionText>
      )}
      <BackButton />
    </Container>
  );
}

export default Tutorial;