import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import useImages from '../hooks/useImage';
import ImageUploadForm from './ImageUploadForm'; 
import { useNavigate } from 'react-router';

const ImageListPage = () => {
  const { getImages, deleteImage } = useImages();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState(null);

  const [openUploadForm, setOpenUploadForm] = useState(false); // <--- modal state for upload
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const data = await getImages();
      setImages(data);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteClick = (imageName) => {
    setSelectedImageName(imageName);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteImage(selectedImageName);
      setOpenDialog(false);
      setSelectedImageName(null);
      fetchImages();
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setSelectedImageName(null);
  };

  // When user clicks Add button
  const handleOpenUploadForm = () => {
    setOpenUploadForm(true);
  };

  // Pass this to ImageUploadForm to close modal + redirect
  const handleUploadFormClose = () => {
    setOpenUploadForm(false);
    // Redirect after closing form
    fetchImages();
    navigate('/image');
  };

  const paginatedImages = images.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
        <Typography variant="h4">Images</Typography>
        <Button variant="contained" color="primary" onClick={handleOpenUploadForm}>
          Add Image
        </Button>
      </Box>

      {/* Table with images */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Image Name</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedImages.map((imageName) => (
              <TableRow key={imageName}>
                <TableCell>{imageName}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteClick(imageName)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {paginatedImages.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No images found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={images.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Delete Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the image <strong>{selectedImageName}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Upload form dialog */}
      <Dialog open={openUploadForm} onClose={() => setOpenUploadForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <ImageUploadForm onClose={handleUploadFormClose} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ImageListPage;
