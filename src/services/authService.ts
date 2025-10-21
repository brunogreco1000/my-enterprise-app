// src/services/authService.ts
import api from '../api/axios';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    username: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await api.post('/auth/login', payload);
  return res.data;
};
