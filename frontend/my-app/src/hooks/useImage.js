import axios from "../api/auth";

const useImage = () => {

    const getImages = async () => {
        try {
            const response = await axios.get('/api/image');
            return response.data;
        } catch (error) {
            throw new Error('Error getting images');
        }
    };

    const getImagesWithData = async () => {
        try {
            const response = await axios.get('/api/image/all');
            return response.data;
        } catch (error) {
            throw new Error('Error getting images with data');
        }
    };


    const uploadImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('/api/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Error uploading image');
        }
    };

    const deleteImage = async (filename) => {
        try {
            const response = await axios.delete(`/api/image/${filename}`);
            return response.data;
        } catch (error) {
            throw new Error('Error deleting image');
        }
    };

    return { getImages, getImagesWithData, uploadImage, deleteImage };
};

export default useImage;
