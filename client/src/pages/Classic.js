import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Board from '../Board';
import { fetchBoard } from '../api';
import VoiceInput from '../components/VoiceInput';
import BackButton from '../components/BackButton';
import BoggleSolver from '../boggleSolver'; // Importing the BoggleSolver

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

const Input = styled.input`
  padding: 10px;
  font-size: 1.2em;
  margin: 10px;
  border: 2px solid #333;
  border-radius: 5px;
  width: 80%;
  max-width: 400px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1.2em;
  margin: 10px;
  background-color: #ff7e5f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff6b4a;
  }
`;

const HintButton = styled(Button)`
  background-color: #4caf50;

  &:hover {
    background-color: #45a049;
  }
`;

const Result = styled.p`
  font-size: 1.2em;
  color: ${props => (props.valid ? 'green' : 'red')};
`;

function Classic() {
  const [board, setBoard] = useState([]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [hint, setHint] = useState('');
  const [solver, setSolver] = useState(null); // Define solver and setSolver

  useEffect(() => {
    fetchBoard().then(data => {
      setBoard(data);
      const dictionary = ['DEF', 'EAB', 'EBC', 'ECB', 'EDB', 'EFB', 'EGH', 'EHI', 'EIH', 'DEFB', 'EABF', 'EBCF']; // Example dictionary with longer words
      const boggleSolver = new BoggleSolver(data, dictionary);
      setSolver(boggleSolver);
      console.log('Solutions:', boggleSolver.getSolutions()); // Debugging: Log solutions
    });
  }, []);

  const handleCheck = () => {
    if (solver) {
      const solutions = solver.getSolutions();
      console.log('Solutions:', solutions); // Debugging: Log solutions
      const isValid = solutions.includes(input.toUpperCase());
      setResult(isValid ? 'Valid word!' : 'Not a valid word.');
    }
  };

  const handleVoiceResult = (transcript) => {
    setInput(transcript);
  };

  const getHint = () => {
    fetch('http://localhost:4000/hint', {
      method: 'POST',
      credentials: 'include', // must send session cookie
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        setHint(data.hint);
      }
    });
  };

  return (
    <Container>
      <Title>Classic Mode</Title>
      <Board board={board} />
      <Input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Enter a word"
      />
      <Button onClick={handleCheck}>Check Word</Button>
      {result && <Result valid={result === 'Valid word!'}>{result}</Result>}
      <VoiceInput onResult={handleVoiceResult} />
      <HintButton onClick={getHint}>Get Hint</HintButton>
      {hint && <p>Hint: {hint}</p>}
      <BackButton />
    </Container>
  );
}

export default Classic;