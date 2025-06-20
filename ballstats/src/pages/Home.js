import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [quickStats, setQuickStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:8000/backend/get_stats.php');
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setQuickStats(data.stats);
        }
      } catch (err) {
        setError('Failed to fetch statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
}, []);

  return (
    <Box sx={{ p: 2, maxWidth: '100%', margin: '0 auto' }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Team Dashboard
      </Typography>

      {/* Quick Stats Grid */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ width: '100%', textAlign: 'center', p: 2 }}>
            {error}
          </Typography>
        ) : quickStats.map((stat, index) => (
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