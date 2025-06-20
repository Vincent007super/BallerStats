import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Divider
} from '@mui/material';

const TrainingData = () => {
  const [data, setData] = useState({ trainings: [], reflections: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/backend/api/get_training_data.php');
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error || 'Failed to fetch training data');
        }
      } catch (err) {
        setError('Failed to fetch training data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ p: 2 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {/* Training Recommendations */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Training Recommendations
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {data.trainings.map((training, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {new Date(training.date_recommended).toLocaleDateString()}
                </Typography>
                <Typography variant="h6" component="div">
                  {training.player_name}
                </Typography>
                <Typography color="textSecondary">
                  Coach: {training.coach_name}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {training.training_text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Self Reflections */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Player Reflections
      </Typography>
      <Grid container spacing={2}>
        {data.reflections.map((reflection, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {new Date(reflection.date_submitted).toLocaleDateString()}
                </Typography>
                <Typography variant="h6" component="div">
                  {reflection.player_name}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {reflection.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TrainingData;