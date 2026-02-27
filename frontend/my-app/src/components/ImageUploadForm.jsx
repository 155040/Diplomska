import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import useImages from '../hooks/useImage';
import { useNavigate } from 'react-router';

const ImageUploadForm = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const { uploadImage } = useImages();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setError('');
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image file to upload.');
      return;
    }

    setUploading(true);
    try {
      await uploadImage(file);
      if (onClose) {
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Error uploading image.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginTop: '16px' }}
      />

      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </Button>
    </Box>
  );
};

export default ImageUploadForm;
