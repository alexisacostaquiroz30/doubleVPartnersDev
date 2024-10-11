/** service/authService.js */
import axios from 'axios';

const API_URL = 'http://localhost:5174/api/';

export const register = async (userData) => {
  try {
    let response = await axios.post(`${API_URL}Users/`, userData);
    return response;
  } catch (error) {
    response.code = 400;
    const newErrors = [];

    if (error.response && error.response.data.username) {
      newErrors.push(...error.response.data.username);
    }

    if (error.response && error.response.data.password) {
      newErrors.push(...error.response.data.password);
    }

    throw new Error(JSON.stringify(newErrors));
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}Users/login/`, userData);
    return response.data;
  } catch (error) {
    const newErrors = [];
    if (error.response.data.detail) {
      newErrors.push(error.response.data.detail);
    }

    throw new Error(JSON.stringify(newErrors));
  }
};

