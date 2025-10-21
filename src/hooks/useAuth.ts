// src/hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext, AuthContextType, User } from '../context/AuthContext';
import {api} from '../api/axios';

export const useAuth = () => {
  const { isLoggedIn, login, logout, user } = useContext<AuthContextType>(AuthContext);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });

      if (response.status === 200 && response.data.user) {
        const userData: User = {
          username: response.data.user.username,
          email: response.data.user.email,
        };

        // Solo almacenamos en memoria dentro del contexto
        login(userData);

        return response.data.user;
      } else {
        throw new Error('Respuesta inválida del servidor.');
      }
    } catch (err: any) {
      // Manejo de error con mensaje amigable
      throw new Error(err.response?.data?.message || 'Error al iniciar sesión.');
    }
  };

  const handleLogout = () => {
    logout();
  };

  return { isLoggedIn, user, handleLogin, handleLogout };
};
