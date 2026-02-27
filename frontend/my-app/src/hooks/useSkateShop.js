import axios from "../api/auth";

const useSkateShop = () => {

  const getSkateShops = async () => {
    try {
      const response = await axios.get('/api/skate-shop');
      return response.data;
    } catch (error) {
      throw new Error('Error getting skate shops');
    }
  }

  const createSkateShop = async (eventData) => {
    try {
      const response = await axios.post('/api/skate-shop', eventData);
      return response.data;
    } catch (error) {
      throw new Error('Error creating skate shop');
    }
  };

  const editSkateShop = async (id, eventData) => {
    try {
      const response = await axios.put(`/api/skate-shop/${id}`, eventData);
      return response.data;
    } catch (error) {
      throw new Error('Error updating skate shop');
    }
  };

  const deleteSkateShop = async (id) => {
    try {
      const response = await axios.delete(`/api/skate-shop/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error deleting skate shop');
    }
  };

  return { createSkateShop, getSkateShops, deleteSkateShop, editSkateShop };
};

export default useSkateShop;
