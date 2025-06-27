'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../components/auth/AuthContext';
import FeedbackSection from '../components/feedback/FeedbackSection';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    team: user?.team || '',
    position: user?.position || '',
    experience: user?.experience || ''
  });

  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const handleProfileUpdate = () => {
    updateProfile(profileData);
    handleEditClose();
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Profile Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                fontSize: '2rem',
                mr: 2
              }}
            >
              {user?.name?.[0] || 'U'}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5">{user?.name}</Typography>
              <Typography color="textSecondary">
                {user?.userType === 'coach' ? 'Coach' : 'Player'} - {user?.team}
              </Typography>
              <Button
                startIcon={<EditIcon />}
                size="small"
                sx={{ mt: 1 }}
                variant="outlined"
                onClick={handleEditOpen}
              >
                Edit Profile
              </Button>
            </Box>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Email
              </Typography>
              <Typography variant="body1">{user?.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Phone
              </Typography>
              <Typography variant="body1">{user?.phone || 'Not set'}</Typography>
            </Grid>
            {user?.userType === 'player' && (
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Position
                </Typography>
                <Typography variant="body1">{user?.position || 'Not set'}</Typography>
              </Grid>
            )}
            {user?.userType === 'coach' && (
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Experience
                </Typography>
                <Typography variant="body1">{user?.experience || 'Not set'}</Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* Feedback Section */}
      <FeedbackSection />

      {/* Edit Profile Dialog */}
      <Dialog open={openEdit} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Team"
                  name="team"
                  value={profileData.team}
                  onChange={handleInputChange}
                />
              </Grid>
              {user?.userType === 'player' && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Position"
                    name="position"
                    value={profileData.position}
                    onChange={handleInputChange}
                  />
                </Grid>
              )}
              {user?.userType === 'coach' && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Experience"
                    name="experience"
                    value={profileData.experience}
                    onChange={handleInputChange}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleProfileUpdate} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;