// src/services/api.js
import axios from 'axios';

// Determine the API URL based on environment
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' // In production, use relative path
  : process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const reviewCode = async (code, language) => {
  try {
    const response = await axios.post(`${API_URL}/review-code`, {
      code,
      language
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.response?.data?.error || error.message);
  }
};