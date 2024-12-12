// client/src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const API_BASE_URL = 'https://wordquest-render-backend.onrender.com';

function Navbar() {
  const [authStatus, setAuthStatus] = useState({ authenticated: false, user: null });

  useEffect(() => {
    // Fetch authentication status from the backend
    const fetchAuthStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/status`, {
          credentials: 'include', // Ensure cookies are included
        });
        if (response.ok) {
          const data = await response.json();
          setAuthStatus(data);
        } else {
          console.error('Failed to fetch auth status:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching auth status:', error);
      }
    };

    fetchAuthStatus();
  }, []);

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          style={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => handleNavigation('/')}
        >
          WordQuest
        </Typography>
        {authStatus.authenticated ? (
          <>
            <Typography variant="body1" style={{ marginRight: '2rem' }}>
              Welcome, {authStatus.user?.name || 'User'}
            </Typography>
            <Button color="inherit" onClick={() => handleNavigation('/tutorial')}>
              Tutorial
            </Button>
            <Button color="inherit" onClick={() => handleNavigation('/profile')}>
              Profile
            </Button>
            <Button color="inherit" onClick={() => handleNavigation('/store')}>
              Store
            </Button>
            <Button
              color="inherit"
              onClick={() => handleNavigation(`${API_BASE_URL}/auth/logout`)}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            color="inherit"
            onClick={() => handleNavigation(`${API_BASE_URL}/auth/google`)}
          >
            Login with Google
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
