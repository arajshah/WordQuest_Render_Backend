// client/src/pages/CustomBoards.js
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
`;

const BoardList = styled.div`
  width: 80%;
  margin: 20px 0;
`;

const BoardItem = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BoardName = styled.span`
  font-size: 1.2em;
  color: #333;
`;

const Button = styled.button`
  background: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background 0.3s;
  margin-right: 10px;

  &:hover {
    background: #45a049;
  }
`;

const DeleteButton = styled.button`
  background: #ff6b6b;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #ff4c4c;
  }
`;

const CreateBoardSection = styled.div`
  width: 80%;
  margin: 20px 0;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 100px;
`;

const CreateButton = styled.button`
  background: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #45a049;
  }
`;

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
    <Container>
      <Title>My Custom Boards</Title>
      {boards.length === 0 && <p>You have no custom boards yet.</p>}
      <BoardList>
        {boards.map(b => (
          <BoardItem key={b._id}>
            <BoardName>{b.name}</BoardName>
            <div>
              <Button onClick={() => handleSelectBoard(b._id)}>View</Button>
              <DeleteButton onClick={() => deleteBoard(b._id)}>Delete</DeleteButton>
            </div>
          </BoardItem>
        ))}
      </BoardList>

      {selectedBoard && (
        <div>
          <h3>Viewing Board: {selectedBoard.name}</h3>
          <Board board={selectedBoard.grid} />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a word"
          />
          <button onClick={handleCheck}>Check Word</button>
          {result && <p>{result}</p>}
          <VoiceInput onResult={handleVoiceResult} />
        </div>
      )}

      <CreateBoardSection>
        <h3>Create a New Board</h3>
        <Input 
          placeholder="Board Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
        />
        <Textarea 
          placeholder="Enter rows of letters separated by spaces, one row per line" 
          value={gridText} 
          onChange={e => setGridText(e.target.value)} 
        />
        <CreateButton onClick={createBoard}>Create Board</CreateButton>
      </CreateBoardSection>
      <BackButton />
    </Container>
  );
}

export default CustomBoards;
