import axios from 'axios';

const API_URL = 'http://localhost:5174/api/';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}Products`);
    return response.data.$values;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_URL}products${id}/`);
  if (!response.ok) {
    throw new Error('Error al obtener el producto');
  }
  return await response.json();
};

