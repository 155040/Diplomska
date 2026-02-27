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
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router'; 
import useSkateShop from '../hooks/useSkateShop'; 

const SkateShopListPage = () => {
  const { getSkateShops, deleteSkateShop, editSkateShop } = useSkateShop(); // add editSkateShop
  const [shops, setShops] = useState([]);
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);  // edit modal open state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    url: '',
  }); // form data for edit
  const rowsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const data = await getSkateShops();
      setShops(data);
    } catch (error) {
      console.error('Failed to fetch skate shops:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteClick = (id) => {
    setSelectedShopId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteSkateShop(selectedShopId);
      setOpenDialog(false);
      setSelectedShopId(null);
      fetchShops();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setSelectedShopId(null);
  };

  const handleAddShopClick = () => {
    navigate('/add-skate-shop');
  };

  // ----------- EDIT HANDLERS ------------

  const handleEditClick = (shop) => {
    setSelectedShopId(shop.id);
    setFormData({
      name: shop.name,
      description: shop.description,
      location: shop.location,
      url: shop.url || '',
    });
    setEditModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async () => {
    try {
      await editSkateShop(selectedShopId, formData);
      setEditModalOpen(false);
      setSelectedShopId(null);
      fetchShops();
    } catch (error) {
      console.error('Failed to update skate shop:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditModalOpen(false);
    setSelectedShopId(null);
  };

  // -------------------------------------

  const paginatedShops = shops.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
        <Typography variant="h4">Skate Shops</Typography>
        <Button variant="contained" color="primary" onClick={handleAddShopClick}>
          Add Skate Shop
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Location</strong></TableCell>
              <TableCell><strong>Website</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedShops.map((shop) => (
              <TableRow key={shop.id}>
                <TableCell>{shop.name}</TableCell>
                <TableCell>{shop.description}</TableCell>
                <TableCell>{shop.location}</TableCell>
                <TableCell>
                  {shop.url ? (
                    <Link href={shop.url} target="_blank" rel="noopener noreferrer">
                      {shop.url}
                    </Link>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditClick(shop)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteClick(shop.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {paginatedShops.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No skate shops found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={shops.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Delete Skate Shop</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this skate shop?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={handleCancelEdit} fullWidth maxWidth="sm">
        <DialogTitle>Edit Skate Shop</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
          />
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            margin="normal"
            name="location"
            value={formData.location}
            onChange={handleFormChange}
          />
          <TextField
            label="Website URL"
            variant="outlined"
            fullWidth
            margin="normal"
            name="url"
            value={formData.url}
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

export default SkateShopListPage;
