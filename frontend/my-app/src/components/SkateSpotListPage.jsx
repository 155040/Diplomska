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
  TextField,
} from '@mui/material';
import useSkateSpot from '../hooks/useSkateSpot';
import { useNavigate } from 'react-router'; 

const SkateSpotListPage = () => {
  const { getSkateSpots, deleteSkateSpot, editSkateSpot } = useSkateSpot();
  const [spots, setSpots] = useState([]);
  const [page, setPage] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedSpotId, setSelectedSpotId] = useState(null);
  const [formData, setFormData] = useState({ coordinate: '' });
  const rowsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    fetchSpots();
  }, []);

  const fetchSpots = async () => {
    try {
      const data = await getSkateSpots();
      setSpots(data);
    } catch (error) {
      console.error('Failed to fetch skate spots:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Delete handlers
  const handleDeleteClick = (id) => {
    setSelectedSpotId(id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteSkateSpot(selectedSpotId);
      setOpenDeleteDialog(false);
      setSelectedSpotId(null);
      fetchSpots();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedSpotId(null);
  };

  // Edit handlers
  const handleEditClick = (spot) => {
    setSelectedSpotId(spot.id);
    setFormData({ coordinate: spot.coordinate });
    setOpenEditDialog(true);
  };

  const handleFormChange = (e) => {
    setFormData({ coordinate: e.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      await editSkateSpot(selectedSpotId, formData);
      setOpenEditDialog(false);
      setSelectedSpotId(null);
      fetchSpots();
    } catch (error) {
      console.error('Failed to update skate spot:', error);
    }
  };

  const handleCancelEdit = () => {
    setOpenEditDialog(false);
    setSelectedSpotId(null);
  };

  const handleAddSpotClick = () => {
    navigate('/add-skate-spot');
  };

  const paginatedSpots = spots.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
        <Typography variant="h4">Skate Spots</Typography>
        <Button variant="contained" color="primary" onClick={handleAddSpotClick}>
          Add Skate Spot
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Coordinate</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSpots.map((spot) => (
              <TableRow key={spot.id}>
                <TableCell>{spot.coordinate}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditClick(spot)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteClick(spot.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {paginatedSpots.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No skate spots found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={spots.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Delete Skate Spot</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this skate spot?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={openEditDialog} onClose={handleCancelEdit} fullWidth maxWidth="sm">
        <DialogTitle>Edit Skate Spot</DialogTitle>
        <DialogContent>
          <TextField
            label="Coordinate"
            variant="outlined"
            fullWidth
            margin="normal"
            name="coordinate"
            value={formData.coordinate}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} color="primary">Cancel</Button>
          <Button onClick={handleFormSubmit} color="primary" variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SkateSpotListPage;
