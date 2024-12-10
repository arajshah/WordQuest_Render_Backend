import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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

const Info = styled.p`
  font-size: 1.2em;
  color: #333;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  font-size: 1.2em;
  color: #333;
  margin: 10px 0;
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

function Store() {
  const [authStatus, setAuthStatus] = useState({ authenticated: false, user: null });
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/auth/status', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setAuthStatus(data));

    fetch('http://localhost:4000/rewards/store')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const buyItem = (itemId) => {
    fetch('http://localhost:4000/rewards/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ itemId })
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        alert(`Purchased successfully! Coins left: ${data.coins}`);
        setAuthStatus(prev => ({ ...prev, user: { ...prev.user, coins: data.coins, achievements: data.achievements } }));
      }
    });
  };

  if (!authStatus.authenticated) {
    return <Info>Please log in to use the store.</Info>;
  }

  return (
    <Container>
      <Title>Store</Title>
      <Info>Coins: {authStatus.user?.coins}</Info>
      <List>
        {items.map(item => (
          <ListItem key={item.id}>
            {item.name} - {item.cost} coins
            <Button onClick={() => buyItem(item.id)}>Buy</Button>
          </ListItem>
        ))}
      </List>
      <BackButton />
    </Container>
  );
}

export default Store;