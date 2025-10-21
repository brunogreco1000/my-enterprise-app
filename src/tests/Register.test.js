import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Register from '../pages/Register';
import { AuthContext } from '../context/AuthContext';
// Mock de la API correctamente
vi.mock('../api/axios', () => ({
    default: {
        post: vi.fn(() => Promise.resolve({
            status: 201,
            data: {
                user: { username: 'testuser', email: 'test@example.com' },
                accessToken: 'token',
                refreshToken: 'refresh',
            },
        })),
    },
}));
describe('Register Component', () => {
    const mockLogin = vi.fn();
    const mockLogout = vi.fn();
    const mockAuthContext = {
        isLoggedIn: false,
        user: null,
        isLoading: false,
        login: mockLogin,
        logout: mockLogout,
    };
    beforeEach(() => {
        vi.clearAllMocks();
    });
    test('renders register form fields correctly', () => {
        render(_jsx(AuthContext.Provider, { value: mockAuthContext, children: _jsx(MemoryRouter, { children: _jsx(Register, {}) }) }));
        expect(screen.getByPlaceholderText(/Tu nombre de usuario/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/ejemplo@correo.com/i)).toBeInTheDocument();
        expect(screen.getAllByPlaceholderText(/••••••••/i)).toHaveLength(2);
    });
    test('shows error if fields are empty on submit', async () => {
        render(_jsx(AuthContext.Provider, { value: mockAuthContext, children: _jsx(MemoryRouter, { children: _jsx(Register, {}) }) }));
        fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
        expect(await screen.findByText(/Por favor/i)).toBeInTheDocument();
    });
    test('calls login when registration succeeds', async () => {
        render(_jsx(AuthContext.Provider, { value: mockAuthContext, children: _jsx(MemoryRouter, { children: _jsx(Register, {}) }) }));
        fireEvent.change(screen.getByPlaceholderText(/Tu nombre de usuario/i), {
            target: { value: 'testuser' },
        });
        fireEvent.change(screen.getByPlaceholderText(/ejemplo@correo.com/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getAllByPlaceholderText(/••••••••/i)[0], {
            target: { value: 'Aa123456!' },
        });
        fireEvent.change(screen.getAllByPlaceholderText(/••••••••/i)[1], {
            target: { value: 'Aa123456!' },
        });
        fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
        await waitFor(() => expect(mockLogin).toHaveBeenCalledWith({ username: 'testuser', email: 'test@example.com' }, { accessToken: 'token', refreshToken: 'refresh' }));
    });
});
