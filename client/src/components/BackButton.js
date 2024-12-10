import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/')} 
      style={{
        margin: '10px 0',
        padding: '10px 20px',
        background: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      Home 
    </button>
  );
}

export default BackButton;
