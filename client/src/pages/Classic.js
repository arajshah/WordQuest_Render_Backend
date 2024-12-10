// client/src/pages/Classic.js
import React, { useEffect, useState } from 'react';
import Board from '../Board';
import { fetchBoard, checkWord } from '../api';
import VoiceInput from '../components/VoiceInput';
import BackButton from '../components/BackButton';

function Classic() {
  const [board, setBoard] = useState([]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [hint, setHint] = useState('');

  useEffect(() => {
    fetchBoard().then(data => setBoard(data));
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


  return (
    <div>
        <h2>Classic Mode</h2>
        <Board board={board} />
        <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Enter a word"
        />
        <button onClick={handleCheck}>Check Word</button>
        {result && <p>{result}</p>}
        <VoiceInput onResult={handleVoiceResult} />
        <button onClick={getHint}>Get Hint</button>
        {hint && <p>Hint: {hint}</p>}
        <p><BackButton /></p>
    </div>
  );
}

export default Classic;
