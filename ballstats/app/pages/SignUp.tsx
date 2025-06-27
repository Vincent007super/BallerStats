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
  MenuItem,
} from '@mui/material';
import { useAuth } from '../components/auth/AuthContext';

const NBA_TEAMS = [
  'Atlanta Hawks',
  'Boston Celtics',
  'Brooklyn Nets',
  'Charlotte Hornets',
  'Chicago Bulls',
  'Cleveland Cavaliers',
  'Dallas Mavericks',
  'Denver Nuggets',
  'Detroit Pistons',
  'Golden State Warriors',
  'Houston Rockets',
  'Indiana Pacers',
  'LA Clippers',
  'Los Angeles Lakers',
  'Memphis Grizzlies',
  'Miami Heat',
  'Milwaukee Bucks',
  'Minnesota Timberwolves',
  'New Orleans Pelicans',
  'New York Knicks',
  'Oklahoma City Thunder',
  'Orlando Magic',
  'Philadelphia 76ers',
  'Phoenix Suns',
  'Portland Trail Blazers',
  'Sacramento Kings',
  'San Antonio Spurs',
  'Toronto Raptors',
  'Utah Jazz',
  'Washington Wizards',
];

const NBA_POSITIONS = [
  'Point Guard (PG)',
  'Shooting Guard (SG)',
  'Small Forward (SF)',
  'Power Forward (PF)',
  'Center (C)',
];

type UserType = 'player' | 'coach';

const SignUp = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [userType, setUserType] = useState<UserType>('player');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    team: '',
    position: '',
    experience: '',
  });
  const [error, setError] = useState('');

  const handleUserTypeChange = (event: React.MouseEvent<HTMLElement>, newUserType: UserType | null) => {
    if (newUserType !== null) {
      setUserType(newUserType);
    }
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.name || !formData.email || !formData.password || !formData.team) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const result = await register({
        ...formData,
        userType,
      });
      if (result.success) {
        navigate('/login');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration');
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
            Sign Up for BallerStats
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
              label="Name"
              variant="outlined"
              margin="normal"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              required
            />

            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              type="password"
              required
            />

            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              type="password"
              required
            />

            <TextField
              select
              fullWidth
              label="Team"
              variant="outlined"
              margin="normal"
              name="team"
              value={formData.team}
              onChange={handleInputChange}
              required
            >
              {NBA_TEAMS.map((team) => (
                <MenuItem key={team} value={team}>
                  {team}
                </MenuItem>
              ))}
            </TextField>

            {userType === 'player' && (
              <TextField
                select
                fullWidth
                label="Position"
                variant="outlined"
                margin="normal"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
              >
                {NBA_POSITIONS.map((pos) => (
                  <MenuItem key={pos} value={pos}>
                    {pos}
                  </MenuItem>
                ))}
              </TextField>
            )}

            {userType === 'coach' && (
              <TextField
                fullWidth
                label="Experience (years)"
                variant="outlined"
                margin="normal"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                Already have an account?{' '}
                <Button
                  color="primary"
                  onClick={() => navigate('/login')}
                  sx={{ textTransform: 'none' }}
                >
                  Log in
                </Button>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUp;