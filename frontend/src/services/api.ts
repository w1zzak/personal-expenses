import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const loginUser = async (credentials: any) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData: any) => {
  const response = await api.post('/auth/signup', userData);
  return response.data;
};

// Expenses endpoints
export const getExpenses = async () => {
  const response = await api.get('/gastos');
  return response.data;
};

export const createExpense = async (data: any) => {
  const response = await api.post('/gastos', data);
  return response.data;
};

export const deleteExpense = async (id: number) => {
  await api.delete(`/gastos/${id}`);
};

export const updateExpense = async (id: number, data: any) => {
  const response = await api.put(`/gastos/${id}`, data);
  return response.data;
};

export default api;
