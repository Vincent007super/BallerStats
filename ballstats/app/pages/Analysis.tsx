import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Analysis: React.FC = () => {
  const shotDistributionData = {
    labels: ['3-Pointers', '2-Pointers', 'Free Throws'],
    datasets: [
      {
        data: [30, 45, 25],
        backgroundColor: ['#1976d2', '#dc004e', '#4caf50'],
        borderWidth: 0
      }
    ]
  };

  const strengthsList = [
    'Strong perimeter defense',
    'Efficient fast break conversion',
    'High free throw percentage'
  ];

  const weaknessesList = [
    'Rebounding needs improvement',
    'Inconsistent 3-point shooting',
    'Late game performance'
  ];

  const insights = [
    {
      title: 'Scoring Efficiency',
      value: '+8.5%',
      trend: 'up',
      description: 'Improvement in scoring efficiency over last 5 games'
    },
    {
      title: 'Defense Rating',
      value: '-3.2%',
      trend: 'down',
      description: 'Slight decline in defensive performance'
    },
    {
      title: 'Ball Movement',
      value: '+12.3%',
      trend: 'up',
      description: 'Significant improvement in assist ratio'
    }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Performance Analysis
      </Typography>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Key Insights
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {insights.map((insight, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item xs={8}>
                    <Typography variant="subtitle1">{insight.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {insight.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: 'right' }}>
                    <Typography
                      variant="h6"
                      color={insight.trend === 'up' ? 'primary' : 'error'}
                      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
                    >
                      {insight.value}
                      {insight.trend === 'up' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Shot Distribution
          </Typography>
          <Box sx={{ maxWidth: 300, margin: '0 auto' }}>
            <Doughnut data={shotDistributionData} />
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Strengths
              </Typography>
              <List>
                {strengthsList.map((strength, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingUpIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={strength} />
                    </ListItem>
                    {index < strengthsList.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Areas for Improvement
              </Typography>
              <List>
                {weaknessesList.map((weakness, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingDownIcon color="error" />
                      </ListItemIcon>
                      <ListItemText primary={weakness} />
                    </ListItem>
                    {index < weaknessesList.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analysis;
