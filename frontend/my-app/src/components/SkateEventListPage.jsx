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
import { useNavigate } from 'react-router';
import useSkateEvent from '../hooks/useSkateEvent';

const SkateEventListPage = () => {
  const { getSkateEvents, deleteSkateEvent, editSkateEvent } = useSkateEvent();
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getSkateEvents();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch skate events:', error);
    }
  };

  const handleAddEventClick = () => {
    navigate('/add-skate-event');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteClick = (eventId) => {
    setSelectedEventId(eventId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteSkateEvent(selectedEventId);
      setOpenDialog(false);
      setSelectedEventId(null);
      fetchEvents();
    } catch (error) {
      console.error('Failed to delete skate event:', error);
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setSelectedEventId(null);
  };

  const handleEditClick = (event) => {
    setSelectedEventId(event.id);
    setEditFormData({
      name: event.name,
      description: event.description,
      location: event.location,
      date: event.date,
    });
    setEditModalOpen(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFormSubmit = async () => {
    try {
      await editSkateEvent(selectedEventId, editFormData);
      setEditModalOpen(false);
      fetchEvents();
    } catch (error) {
      console.error('Failed to update skate event:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditModalOpen(false);
    setSelectedEventId(null);
  };

  const paginatedEvents = events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
        <Typography variant="h4">Skate Events</Typography>
        <Button variant="contained" color="primary" onClick={handleAddEventClick}>
          Add Skate Event
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Location</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditClick(event)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteClick(event.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {paginatedEvents.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No events found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={events.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Delete Skate Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this skate event? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={handleCancelEdit} fullWidth maxWidth="sm">
        <DialogTitle>Edit Skate Event</DialogTitle>
        <DialogContent>
          <TextField
            label="Event Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={editFormData.name}
            onChange={handleEditFormChange}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            name="description"
            value={editFormData.description}
            onChange={handleEditFormChange}
          />
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            margin="normal"
            name="location"
            value={editFormData.location}
            onChange={handleEditFormChange}
          />
          <TextField
            label="Date"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            name="date"
            value={editFormData.date}
            onChange={handleEditFormChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} color="primary">Cancel</Button>
          <Button onClick={handleEditFormSubmit} color="primary" variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SkateEventListPage;
