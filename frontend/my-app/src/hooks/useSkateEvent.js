import axios from "../api/auth";

const useSkateEvent = () => {

  const getSkateEvents = async () => {
    try {
      const response = await axios.get('/api/skate-event');
      return response.data;
    } catch (error) {
      throw new Error('Error getting skate events');
    }
  }

  const createSkateEvent = async (eventData) => {
    try {
      const response = await axios.post('/api/skate-event', eventData);
      return response.data;
    } catch (error) {
      throw new Error('Error creating skate event');
    }
  };

  const editSkateEvent = async (id, eventData) => {
    try {
      const response = await axios.put(`/api/skate-event/${id}`, eventData);
      return response.data;
    } catch (error) {
      throw new Error('Error updating skate event');
    }
  };

  const deleteSkateEvent = async (id) => {
    try {
      const response = await axios.delete(`/api/skate-event/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error deleting skate event');
    }
  };

  return { createSkateEvent, getSkateEvents, deleteSkateEvent, editSkateEvent };
};

export default useSkateEvent;
