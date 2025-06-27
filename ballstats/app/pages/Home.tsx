import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const quickStats = [
    { label: 'Games', value: '24' },
    { label: 'Win Rate', value: '68%' },
    { label: 'Avg Points', value: '82.5' },
    { label: 'Players', value: '15' }
  ];

  return (
    <Box sx={{ p: 2, maxWidth: '100%', margin: '0 auto' }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Team Dashboard
      </Typography>

      {/* Quick Stats Grid */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {quickStats.map((stat, index) => (
          <Grid item xs={6} key={index}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                '&:hover': { transform: 'scale(1.02)', transition: 'transform 0.2s' }
              }}
              onClick={() => navigate('/stats')}
            >
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {stat.label}
                </Typography>
                <Typography variant="h4" component="div">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Games */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Recent Games
      </Typography>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" color="primary">
            vs Warriors
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Won 92-85 • Nov 15, 2023
          </Typography>
        </CardContent>
      </Card>

      {/* Upcoming Game */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Next Game
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="subtitle1" color="primary">
            vs Lakers
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Nov 20, 2023 • 7:30 PM
          </Typography>
          <Typography variant="body2">
            Home Court
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;