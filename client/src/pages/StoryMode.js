import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Board from '../Board';
import { checkWord } from '../api';
import VoiceInput from '../components/VoiceInput';
import BackButton from '../components/BackButton';

const Container = styled.div`
  text-align: center;
  padding: 20px;
  background: linear-gradient(to right, #ffecd2, #fcb69f);
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 2.5em;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1.2em;
  margin: 10px;
  border: 2px solid #333;
  border-radius: 5px;
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
  &:hover {
    background-color: #feb47b;
  }
`;

const Result = styled.p`
  font-size: 1.2em;
  color: ${props => (props.valid ? 'green' : 'red')};
`;

const Hint = styled.p`
  font-size: 1.2em;
  color: #333;
`;

function StoryMode() {
  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [hint, setHint] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/story')
      .then(res => res.json())
      .then(data => {
        setLevels(data);
        if (data.length > 0) {
          setCurrentLevel(data[0]);
        }
      });
  }, []);

  const handleCheck = async () => {
    const { valid } = await checkWord(input);
    setResult(valid ? 'Valid word!' : 'Not a valid word.');
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

  if (!currentLevel) return <p>Loading level...</p>;

  return (
    <Container>
      <Title>Story Mode - Level {currentLevel.levelNumber}</Title>
      <Board board={currentLevel.grid} />
      <Input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Enter a word"
      />
      <Button onClick={handleCheck}>Check Word</Button>
      {result && <Result valid={result === 'Valid word!'}>{result}</Result>}
      <VoiceInput onResult={handleVoiceResult} />
      <Button onClick={getHint}>Get Hint</Button>
      {hint && <Hint>Hint: {hint}</Hint>}
      <BackButton />
    </Container>
  );
}

export default StoryMode;