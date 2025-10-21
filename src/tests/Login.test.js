import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Login from '../pages/Login';
import { AuthContext } from '../context/AuthContext';
describe('Login Component', () => {
    const mockLogin = vi.fn();
    const mockLogout = vi.fn();
    const mockAuthContext = {
        isLoggedIn: false,
        user: null,
        login: mockLogin,
        logout: mockLogout,
        isLoading: false
    };
    beforeEach(() => {
        vi.clearAllMocks();
    });
    test('renders login form fields correctly', () => {
        render(_jsx(AuthContext.Provider, { value: mockAuthContext, children: _jsx(MemoryRouter, { children: _jsx(Login, {}) }) }));
        expect(screen.getByPlaceholderText(/ejemplo@correo.com/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
    });
    test('shows error when submitting empty form', async () => {
        render(_jsx(AuthContext.Provider, { value: mockAuthContext, children: _jsx(MemoryRouter, { children: _jsx(Login, {}) }) }));
        const button = screen.getByRole('button', { name: /Login/i });
        fireEvent.click(button);
        expect(await screen.findByText(/Por favor completa todos los campos/i)).toBeInTheDocument();
    });
    test('calls login when API responds successfully', async () => {
        vi.mock('../api/axios', () => ({
            default: {
                post: vi.fn(() => Promise.resolve({
                    status: 200,
                    data: { username: 'testuser', email: 'test@example.com' },
                })),
            },
        }));
        render(_jsx(AuthContext.Provider, { value: mockAuthContext, children: _jsx(MemoryRouter, { children: _jsx(Login, {}) }) }));
        fireEvent.change(screen.getByPlaceholderText(/ejemplo@correo.com/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/••••••••/i), {
            target: { value: 'Aa123456!' },
        });
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));
        // Espera breve para que se procese la promesa
        await new Promise((resolve) => setTimeout(resolve, 200));
        expect(mockLogin).toHaveBeenCalled();
    });
});
