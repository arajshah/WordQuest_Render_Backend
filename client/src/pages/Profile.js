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
`;

function Profile() {
  const [authStatus, setAuthStatus] = useState({ authenticated: false, user: null });

  useEffect(() => {
    fetch('http://localhost:4000/auth/status', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setAuthStatus(data));
  }, []);

  if (!authStatus.authenticated) {
    return <Info>Please log in to view your profile.</Info>;
  }

  const { user } = authStatus;
  return (
    <Container>
      <Title>{user.name}'s Profile</Title>
      <Info>Coins: {user.coins}</Info>
      <h3>Achievements:</h3>
      <List>
        {user.achievements.length === 0 && <ListItem>No achievements yet</ListItem>}
        {user.achievements.map(a => <ListItem key={a}>{a}</ListItem>)}
      </List>
      <BackButton />
    </Container>
  );
}

export default Profile;