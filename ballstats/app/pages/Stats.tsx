import React from 'react';
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
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event:any, newValue:any) => {
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
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        Statistics
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ mb: 3 }}
      >
        <Tab label="Team" />
        <Tab label="Players" />
      </Tabs>

      {tabValue === 0 && (
        <>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Line data={chartData} options={chartOptions} />
            </CardContent>
          </Card>

          <Grid container spacing={2}>
            {statsCards.map((stat, index) => (
              <Grid item xs={6} key={index}>
                <Card>
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
        </>
      )}

      {tabValue === 1 && (
        <Grid container spacing={2}>
          {['John Doe', 'Mike Smith', 'Chris Johnson'].map((player, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{player}</Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">PPG</Typography>
                      <Typography>18.5</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">RPG</Typography>
                      <Typography>7.2</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="textSecondary">APG</Typography>
                      <Typography>5.4</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Stats;