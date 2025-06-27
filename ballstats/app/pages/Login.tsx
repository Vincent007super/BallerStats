'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
} from '@mui/material';
import { useAuth } from '../components/auth/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userType, setUserType] = useState('player');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUserTypeChange = (event:any, newUserType:any) => {
    if (newUserType !== null) {
      setUserType(newUserType);
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const result = await login(email, password, userType);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            BallerStats Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <ToggleButtonGroup
              value={userType}
              exclusive
              onChange={handleUserTypeChange}
              aria-label="user type"
              sx={{ width: '100%', mb: 2 }}
            >
              <ToggleButton value="player" aria-label="player" sx={{ width: '50%' }}>
                Player
              </ToggleButton>
              <ToggleButton value="coach" aria-label="coach" sx={{ width: '50%' }}>
                Coach
              </ToggleButton>
            </ToggleButtonGroup>

            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />

            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
            >
              Login
            </Button>
          </Box>
          
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              Don't have an account?{' '}
              <Button
                color="primary"
                onClick={() => navigate('/signup')}
                sx={{ textTransform: 'none' }}
              >
                Sign up
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;