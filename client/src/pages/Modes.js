import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

function Modes() {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Select a Mode</Title>
      <Button onClick={() => navigate('/classic')}>Classic</Button>
      <Button onClick={() => navigate('/story')}>Story</Button>
      <Button onClick={() => navigate('/custom')}>Custom</Button>
    </Container>
  );
}

export default Modes;