import React, { useState, useEffect } from 'react';
import { fetchBoard, checkWord } from './api';
import Board from './Board';

function App() {
  const [board, setBoard] = useState([]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    fetchBoard().then(data => setBoard(data));
  }, []);

  const handleCheck = async () => {
    const { valid } = await checkWord(input);
    setResult(valid ? 'Valid word!' : 'Not a valid word.');
  };

  return (
    <div>
      <h1>WordQuest MVP</h1>
      <Board board={board} />
      <input 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="Enter a word"
      />
      <button onClick={handleCheck}>Check Word</button>
      {result && <p>{result}</p>}
    </div>
  );
}

export default App;

