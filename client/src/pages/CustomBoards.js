// client/src/pages/CustomBoards.js
import React, { useEffect, useState } from 'react';
import Board from '../Board';
import { checkWord } from '../api';
import VoiceInput from '../components/VoiceInput';
import BackButton from '../components/BackButton';

function CustomBoards() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [name, setName] = useState('');
  const [gridText, setGridText] = useState('');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/boards/my', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (!data.error) setBoards(data);
      });
  }, []);

  const createBoard = () => {
    const rows = gridText
      .split('\n')
      .map(line => line.trim().split(' '));

    fetch('http://localhost:4000/boards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, grid: rows })
    })
    .then(res => res.json())
    .then(newBoard => {
        if (newBoard.error) {
            alert(`Error creating board: ${newBoard.error}`);
        } else {
            setBoards([...boards, newBoard]);
            setName('');
            setGridText('');
        }
    });
  };

  const deleteBoard = (id) => {
    if (!window.confirm('Are you sure you want to delete this board?')) return;

    fetch(`http://localhost:4000/boards/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        setBoards(prevBoards => prevBoards.filter(board => board._id !== id));
        if (selectedBoard && selectedBoard._id === id) {
          setSelectedBoard(null);
        }
        alert('Board deleted successfully.');
      }
    });
  };

  const handleSelectBoard = (id) => {
    const board = boards.find(b => b._id === id);
    setSelectedBoard(board);
    setInput('');
    setResult('');
  };

  const handleCheck = async () => {
    const { valid } = await checkWord(input);
    setResult(valid ? 'Valid word!' : 'Not a valid word.');
  };

  const handleVoiceResult = (transcript) => {
    setInput(transcript);
  };

  return (
    <div>
      <h2>My Custom Boards</h2>
      {boards.length === 0 && <p>You have no custom boards yet.</p>}
      <ul>
        {boards.map(b => (
          <li key={b._id}>
            <button onClick={() => handleSelectBoard(b._id)}>
              {b.name}
            </button>
            <button onClick={() => deleteBoard(b._id)} style={{ marginLeft: '10px', color: 'red' }}>
                Delete
            </button>
          </li>
        ))}
      </ul>

      {selectedBoard && (
        <div>
          <h3>Viewing Board: {selectedBoard.name}</h3>
          <Board board={selectedBoard.grid} />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a word"
          />
          <button onClick={handleCheck}>Check Word</button>
          {result && <p>{result}</p>}
          <VoiceInput onResult={handleVoiceResult} />
        </div>
      )}

      <h3>Create a New Board</h3>
      <input 
        placeholder="Board Name" 
        value={name} 
        onChange={e => setName(e.target.value)} 
      />
      <textarea 
        placeholder="Enter rows of letters separated by spaces, one row per line" 
        value={gridText} 
        onChange={e => setGridText(e.target.value)} 
      />
      <button onClick={createBoard}>Create Board</button>
      <p><BackButton /></p>
    </div>
  );
}

export default CustomBoards;
