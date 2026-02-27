import axios from "../api/auth";

const useVideo = () => {
  
  const getVideos = async () => {
    try {
      const response = await axios.get('/api/video');
      return response.data;
    } catch (error) {
      throw new Error('Error getting videos');
    }
  };

  const createVideo = async (videoData) => {
    try {
      const response = await axios.post('/api/video', videoData);
      return response.data;
    } catch (error) {
      throw new Error('Error creating video');
    }
  };

  const deleteVideo = async (id) => {
    try {
      const response = await axios.delete(`/api/video/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error deleting video');
    }
  };

  return { getVideos, createVideo, deleteVideo };
};

export default useVideo;
