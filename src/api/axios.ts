import axios from 'axios';

const api = axios.create({
  baseURL: 'https://my-backend.vercel.app/api', // URL de producción
  withCredentials: true,
});
