import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://my-backend.vercel.app/api', // URL de producción
  withCredentials: true,
});
