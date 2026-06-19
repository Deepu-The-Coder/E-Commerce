import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Products
export const getProducts = (params) => API.get('/products', { params });
export const getProductById = (id) => API.get(`/products/${id}`);

// Cart
export const getCart = () => API.get('/cart');
export const addToCart = (data) => API.post('/cart', data);
export const updateCartItem = (productId, data) => API.put(`/cart/${productId}`, data);
export const removeFromCart = (productId) => API.delete(`/cart/${productId}`);
export const clearCart = () => API.delete('/cart/clear');

// Orders
export const createOrder = (data) => API.post('/orders', data);
export const getOrders = () => API.get('/orders');

export default API;
