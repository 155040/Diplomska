import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';
import useVideo from '../hooks/useVideo';

const VideoListPage = () => {
  const { getVideos, deleteVideo } = useVideo();
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const rowsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const data = await getVideos();
      setVideos(data);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteClick = (id) => {
    setSelectedVideoId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteVideo(selectedVideoId);
      setOpenDialog(false);
      setSelectedVideoId(null);
      fetchVideos();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setSelectedVideoId(null);
  };

  const handleAddVideoClick = () => {
    navigate('/add-video');
  };

  const paginatedVideos = videos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
        <Typography variant="h4">Videos</Typography>
        <Button variant="contained" color="primary" onClick={handleAddVideoClick}>
          Add Video
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Video URL</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedVideos.map((video) => (
              <TableRow key={video.id}>
                <TableCell>
                  {video.url ? (
                    <Link href={video.url} target="_blank" rel="noopener noreferrer">
                      {video.url}
                    </Link>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteClick(video.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {paginatedVideos.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No videos found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={videos.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Delete Video</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this video?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default VideoListPage;
