import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

const PlayerStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost/backend/api/get_player_stats.php');
        const data = await response.json();
        
        if (data.success) {
          setStats(data.data);
        } else {
          setError(data.error || 'Failed to fetch stats');
        }
      } catch (err) {
        setError('Failed to fetch player statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
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
      <Typography variant="h6" sx={{ mb: 2 }}>
        Player Statistics
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">#</TableCell>
              <TableCell>Position</TableCell>
              <TableCell align="right">PPG</TableCell>
              <TableCell align="right">APG</TableCell>
              <TableCell align="right">RPG</TableCell>
              <TableCell align="right">3PT%</TableCell>
              <TableCell align="right">FG%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map((player, index) => (
              <TableRow key={index}>
                <TableCell>{player.name}</TableCell>
                <TableCell align="right">{player.jersey_number}</TableCell>
                <TableCell>{player.position}</TableCell>
                <TableCell align="right">{Number(player.avg_points).toFixed(1)}</TableCell>
                <TableCell align="right">{Number(player.avg_assists).toFixed(1)}</TableCell>
                <TableCell align="right">{Number(player.avg_rebounds).toFixed(1)}</TableCell>
                <TableCell align="right">{Number(player.avg_three_point).toFixed(1)}%</TableCell>
                <TableCell align="right">{Number(player.avg_fg_percentage).toFixed(1)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PlayerStats;