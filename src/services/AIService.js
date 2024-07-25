import axios from 'axios';

// Use your computer's local IP address here
const API_URL = 'http://192.168.1.165:3000';  

export const getAIResponse = async (message) => {
  try {
    console.log('Sending request to:', `${API_URL}/chat`);
    const response = await axios.post(`${API_URL}/chat`, { message });
    console.log('Received response:', response.data);
    return response.data.reply;
  } catch (error) {
    console.error('Error details:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    throw error;
  }
};