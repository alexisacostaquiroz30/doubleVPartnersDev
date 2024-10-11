import axios from 'axios';

const API_URL = 'http://localhost:5174/api/'; 

export const WishlistItemPost = async (WishlistItems ) => { 
  const token = sessionStorage.getItem('access'); 

  if (!token) {
    throw new Error('Debes iniciar sesión para seguir adelante');
  }

  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(`${API_URL}Wishlist/`, WishlistItems , { headers }); 
    return response.data;
  } catch (error) {
    console.error('Error al crear la WishlistItem:', error.response?.data || error.message);
    const newErrors = [];
    if (error.response && error.response.data) {
      
      if (error.response.data.detail) {
        newErrors.push(error.response.data.detail);
      }
    }
    throw new Error(JSON.stringify(newErrors)); 
  }
};

export const getWishlist = async () => {
  const userId = sessionStorage.getItem('user'); 

  if (!userId) {
    throw new Error('No se encontró el ID del usuario');
  }

  const token = sessionStorage.getItem('access'); 

  if (!token) {
    throw new Error('Debes iniciar sesión para seguir adelante');
  }

  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.get(`${API_URL}Wishlist/${userId}`, { headers });
    return response.data.$values;
  } catch (error) {
    console.error('Error al obtener el historial de compras:', error.response?.data || error.message);
    const newErrors = [];
    if (error.response && error.response.data) {
      if (error.response.data.detail) {
        newErrors.push(error.response.data.detail);
      }
    }
    throw new Error(JSON.stringify(newErrors));
  }
};