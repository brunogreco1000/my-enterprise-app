import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // permite enviar cookies HttpOnly
});

// Ya no agregamos Authorization header desde localStorage
// El backend usará el refresh token en cookie para renovar accessToken automáticamente

export default api;
