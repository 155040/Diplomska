import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router';
import useSkateEvent from '../hooks/useSkateEvent';

const SkateEventForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
  });
  const navigate = useNavigate();
  const { createSkateEvent } = useSkateEvent();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSkateEvent(formData);
      navigate('/skate-event');
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Create Skate Event
        </Typography>
        <TextField
          label="Event Name"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        <TextField
          label="Date"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default SkateEventForm;
