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
