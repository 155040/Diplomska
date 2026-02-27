import axios from "../api/auth";

const useSkateSpot = () => {

  const getSkateSpots = async () => {
    try {
      const response = await axios.get('/api/skate-spot');
      return response.data;
    } catch (error) {
      throw new Error('Error getting skate spots');
    }
  }

  const createSkateSpot = async (eventData) => {
    try {
      const response = await axios.post('/api/skate-spot', eventData);
      return response.data;
    } catch (error) {
      throw new Error('Error creating skate spot');
    }
  };

  const editSkateSpot = async (id, eventData) => {
    try {
      const response = await axios.put(`/api/skate-spot/${id}`, eventData);
      return response.data;
    } catch (error) {
      throw new Error('Error updating skate spot');
    }
  };

  const deleteSkateSpot = async (id) => {
    try {
      const response = await axios.delete(`/api/skate-spot/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error deleting skate spot');
    }
  };

  return { createSkateSpot, getSkateSpots, deleteSkateSpot, editSkateSpot };
};

export default useSkateSpot;
