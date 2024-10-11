import axios from 'axios';

const API_URL = 'http://localhost:8000/supplier/';

export const fetchSuppliers = async () => {
  try {
    const response = await axios.get(`${API_URL}suppliers/`);
    return response.data; 
  } catch (error) {
    console.error("Error al obtener los proveedores:", error);
    throw error; 
  }
};
