import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router';
import useSkateShop from '../hooks/useSkateShop';

const SkateShopForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    url: '',
  });
  const navigate = useNavigate();
  const { createSkateShop } = useSkateShop();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSkateShop(formData);
      navigate('/skate-shop');
    } catch (error) {
      console.error('Failed to create skate shop:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Create Skate Shop
        </Typography>
        <TextField
          label="Shop Name"
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
          label="Website URL"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          name="url"
          value={formData.url}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default SkateShopForm;
