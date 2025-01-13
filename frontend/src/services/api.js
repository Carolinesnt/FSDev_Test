import axios from 'axios';

const API_URL = 'http://localhost:5000/api/transactions';

export const api = {
  getAllTransactions: () => axios.get(API_URL),
  getTransactionById: (id) => axios.get(`${API_URL}/${id}`),
  createTransaction: (data) => axios.post(API_URL, data),
  updateTransaction: (id, data) => axios.put(`${API_URL}/${id}`, data),
  deleteTransaction: (id) => axios.delete(`${API_URL}/${id}`)
};