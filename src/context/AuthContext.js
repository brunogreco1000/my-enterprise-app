import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useEffect } from 'react';
import { api } from '../api/axios';
export const AuthContext = createContext({
    user: null,
    login: () => { },
    logout: () => { },
    isLoggedIn: false,
    isLoading: true,
});
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // Cargar usuario al iniciar
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/auth/me');
                setUser(res.data.user);
            }
            catch {
                setUser(null);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);
    const login = (userData) => {
        setUser(userData);
    };
    const logout = () => {
        setUser(null);
        // Backend limpia cookie HttpOnly del refresh token automáticamente
    };
    const isLoggedIn = !!user;
    return (_jsx(AuthContext.Provider, { value: { user, login, logout, isLoggedIn, isLoading }, children: children }));
};
