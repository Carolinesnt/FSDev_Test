// /project/workspace/frontend/src/services/api.js
import axios from 'axios';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/', // Change to port 5000 and the appropriate API path
  timeout: 5000,
  headers: {
      'Content-Type': 'application/json',
  }
});

// Define the API methods
// export const api = {
//   getAllTransactions: () => axiosInstance.get('/transactions'), // Fixed the path
//   getTransaction: (id) => axiosInstance.get(`/transactions/${id}`), // Fixed the path
//   createTransaction: (data) => axiosInstance.post('/transactions', data), // Fixed the path
//   updateTransaction: (id, data) => axiosInstance.put(`/transactions/${id}`, data), // Fixed the path
//   deleteTransaction: (id) => axiosInstance.delete(`/transactions/${id}`) // Fixed the path
// };

// api.js
export const api = {
  getAllTransactions: () => axiosInstance.get('/transactions'),
  getTransaction: (id) => axiosInstance.get(`/transactions/${id}`), // This already exists
  getTransactionById: (id) => axiosInstance.get(`/transactions/${id}`), // Add this line
  createTransaction: (data) => axiosInstance.post('/transactions', data),
  updateTransaction: (id, data) => axiosInstance.put(`/transactions/${id}`, data),
  deleteTransaction: (id) => axiosInstance.delete(`/transactions/${id}`)
};


