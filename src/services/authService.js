// src/services/authService.ts
import { api } from '../api/axios';
export const login = async (payload) => {
    const res = await api.post('/auth/login', payload);
    return res.data;
};
