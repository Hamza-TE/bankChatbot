import axios from 'axios';
import API_ENDPOINTS  from '../constants/apiEndpoints';


export const getChatResponse = async (messages) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.GET_ASSISTANT_RESPONSE_CHAT,
      { messages },
      );
    return response.data;
  } catch (error) {
    console.error('Error fetching chat response:', error);
    throw error;
  }
};
