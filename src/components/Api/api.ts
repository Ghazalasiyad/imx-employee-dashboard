import axios from 'axios';

const stage = 'dev';
const url = {
  dev: 'http://localhost:4000/api/v1',
};
const BASE_URL = url[stage];

export const Instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});


Instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});
