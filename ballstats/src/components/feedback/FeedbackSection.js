import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip
} from '@mui/material';
import { useAuth } from '../auth/AuthContext';

const FeedbackSection = () => {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');

  // Mock feedback data - will be replaced with database data
  const [feedbacks] = useState([
    {
      id: 1,
      from: 'Coach Smith',
      to: 'John Player',
      message: 'Your three-point shooting accuracy has improved, but we need to work on your defensive positioning.',
      training: 'Suggested drills: 1. Defensive slide practice, 2. Box-out drills, 3. Help defense scenarios',
      date: '2023-11-15'
    },
    {
      id: 2,
      from: 'John Player',
      to: 'Coach Smith',
      message: 'I feel I need more work on my ball handling under pressure.',
      training: 'Areas to focus: Ball control drills and pressure situation practice',
      date: '2023-11-14'
    }
  ]);

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    // TODO: Integrate with backend to save feedback
    setNewComment('');
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Performance Feedback & Training Suggestions
      </Typography>

      {/* Add New Feedback */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Add New Feedback
          </Typography>
          <Box component="form" onSubmit={handleSubmitFeedback}>
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              placeholder={user?.userType === 'coach' 
                ? 'Provide feedback and training suggestions for your player...'
                : 'Share your concerns or areas you want to improve...'}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit Feedback
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Feedback List */}
      <List>
        {feedbacks.map((feedback, index) => (
          <React.Fragment key={feedback.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{feedback.from[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography component="span" variant="subtitle1">
                      {feedback.from}
                    </Typography>
                    <Chip
                      label={feedback.date}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      sx={{ display: 'block', mt: 1 }}
                    >
                      {feedback.message}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      color="primary"
                      sx={{ display: 'block', mt: 1 }}
                    >
                      {feedback.training}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {index < feedbacks.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default FeedbackSection;