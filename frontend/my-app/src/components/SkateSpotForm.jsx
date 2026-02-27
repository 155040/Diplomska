import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router';
import useSkateSpot from '../hooks/useSkateSpot';

const SkateSpotForm = () => {
  const [formData, setFormData] = useState({
    coordinate: '',
  });
  const navigate = useNavigate();
  const { createSkateSpot } = useSkateSpot();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSkateSpot(formData);
      navigate('/skate-spot');
    } catch (error) {
      console.error('Failed to create skate spot:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Create Skate Spot
        </Typography>
        <TextField
          label="Coordinate"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          name="coordinate"
          value={formData.coordinate}
          onChange={handleChange}
          placeholder="e.g., 41.9981, 21.4254"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default SkateSpotForm;
