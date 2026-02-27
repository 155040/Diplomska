import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router';
import useVideo from '../hooks/useVideo';

const VideoForm = () => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();
  const { createVideo } = useVideo();

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVideo({ url });
      navigate('/video');
    } catch (error) {
      console.error('Failed to create video:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Add Video
        </Typography>
        <TextField
          label="Video URL"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          name="url"
          value={url}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default VideoForm;
