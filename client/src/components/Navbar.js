// client/src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const API_BASE_URL = 'https://wordquest-render-backend.onrender.com';

function Navbar() {
  const [authStatus, setAuthStatus] = useState({ authenticated: false, user: null});

  useEffect(() => {
    fetch(`${API_BASE_URL}/auth/status`, { 
        credentials: 'include', // Ensure cookies are sent with the request
    })
    .then(res => res.json())
    .then(data => setAuthStatus(data))
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" style={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => window.location.href='/'}>
          WordQuest
        </Typography>
        {authStatus.authenticated ? (
          <>
            <Typography variant="body1" style={{ marginRight: '2rem' }}>
              Welcome, {authStatus.user.name}
            </Typography>
            <Button color="inherit" onClick={() => window.location.href='/tutorial'}>Tutorial</Button>
            <Button color="inherit" onClick={() => window.location.href='/profile'}>Profile</Button>
            <Button color="inherit" onClick={() => window.location.href='/store'}>Store</Button>
            <Button color="inherit" onClick={() => window.location.href=`${API_BASE_URL}/auth/logout`}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => window.location.href=`${API_BASE_URL}/auth/google`}>
            Login with Google
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
