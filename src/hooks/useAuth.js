// src/hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { api } from '../api/axios';
export const useAuth = () => {
    const { isLoggedIn, login, logout, user } = useContext(AuthContext);
    const handleLogin = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.status === 200 && response.data.user) {
                const userData = {
                    username: response.data.user.username,
                    email: response.data.user.email,
                };
                // Solo almacenamos en memoria dentro del contexto
                login(userData);
                return response.data.user;
            }
            else {
                throw new Error('Respuesta inválida del servidor.');
            }
        }
        catch (err) {
            // Manejo de error con mensaje amigable
            throw new Error(err.response?.data?.message || 'Error al iniciar sesión.');
        }
    };
    const handleLogout = () => {
        logout();
    };
    return { isLoggedIn, user, handleLogin, handleLogout };
};
