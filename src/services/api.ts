import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  login: async (credentials: any) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
};

export const ordersAPI = {
  getOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
  createOrder: async (orderData: any) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  updateOrderStatus: async (orderId: string, status: string) => {
    const response = await api.patch(`/orders/${orderId}/status`, { status });
    return response.data;
  },
};