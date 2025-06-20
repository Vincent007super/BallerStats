import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Tabs, Tab, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import PlayerStats from '../components/PlayerStats';
import TrainingData from '../components/TrainingData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Stats = () => {
  const [tabValue, setTabValue] = useState(0);
  const [setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch('http://localhost/backend/api/get_player_stats.php');
        const data = await response.json();
        
        if (data.success) {
          // Transform the data for the chart
          const playerData = data.data[0] || {}; // Using first player's data for example
          setChartData({
            labels: ['Points', 'Assists', 'Rebounds', '3PT%', 'FG%'],
            datasets: [{
              label: 'Player Statistics',
              data: [
                playerData.avg_points,
                playerData.avg_assists,
                playerData.avg_rebounds,
                playerData.avg_three_point,
                playerData.avg_fg_percentage
              ],
              borderColor: '#1976d2',
              tension: 0.4
            }]
          });
        }
      } catch (err) {
        console.error('Failed to fetch chart data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const chartData = {
    labels: ['Game 1', 'Game 2', 'Game 3', 'Game 4', 'Game 5'],
    datasets: [
      {
        label: 'Points',
        data: [85, 92, 78, 88, 95],
        borderColor: '#1976d2',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Team Performance Trend'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const statsCards = [
    { label: 'Points per Game', value: '82.5' },
    { label: 'Field Goal %', value: '45.8%' },
    { label: '3PT %', value: '37.2%' },
    { label: 'Assists', value: '23.4' },
    { label: 'Rebounds', value: '42.1' },
    { label: 'Steals', value: '8.3' }
  ];

  return (
    <Box sx={{ p: 2, maxWidth: '100%', margin: '0 auto', pb: 7 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Statistics
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ mb: 3 }}
      >
        <Tab label="Overview" />
        <Tab label="Player Stats" />
        <Tab label="Training & Reflections" />
      </Tabs>

      {tabValue === 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Performance Overview
                </Typography>
                <Box sx={{ height: 300 }}>
                  {chartData && <Line data={chartData} options={chartOptions} />}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && <PlayerStats />}
      
      {tabValue === 2 && <TrainingData />}
    </Box>
  );
};

export default Stats;