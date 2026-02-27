import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../hooks/useAuth';
import { Outlet } from 'react-router';

const Navbar = () => {
  const { user } = useUser();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <Box sx={{ width: '100%', margin: 0, padding: 0 }}>
      <AppBar position="static" color="primary" sx={{ width: '100%', maxWidth: '100%' }}>
        <Toolbar sx={{ px: 0 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Skate
          </Typography>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/gallery">Gallery</Button>
          {user && (
            <>
              <Button color="inherit" href="/skate-event">Skate Event</Button>
              <Button color="inherit" href="/skate-shop">Skate Shop</Button>
              <Button color="inherit" href="/skate-spot">Skate Spot</Button>
              <Button color="inherit" href="/video">Video</Button>
              <Button color="inherit" href="/image">Image</Button>
            </>
          )}
          {user ? (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button color="inherit" href="/login">Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default Navbar;
