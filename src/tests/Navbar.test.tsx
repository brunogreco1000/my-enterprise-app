import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Navbar from '../components/Navbar';
import { AuthContext, UserType } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

describe('Navbar Component', () => {
  const mockLogin = vi.fn();
  const mockLogout = vi.fn();
  const mockToggleTheme = vi.fn();

  const renderNavbar = (isLoggedIn = false, theme: 'light' | 'dark' = 'light') => {
    render(
      <MemoryRouter>
        <AuthContext.Provider
          value={{
            isLoggedIn,
            user: isLoggedIn ? { username: 'testuser', email: 'test@example.com' } as UserType : null,
            login: mockLogin,
            logout: mockLogout,
          }}
        >
          <ThemeContext.Provider value={{ theme, toggleTheme: mockToggleTheme }}>
            <Navbar />
          </ThemeContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders public links when logged out', () => {
    renderNavbar(false, 'light');

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  test('renders user info and logout when logged in', () => {
    renderNavbar(true, 'dark');

    expect(screen.getByText(/Hi, testuser/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test('calls toggleTheme when theme button is clicked', () => {
    renderNavbar(false, 'light');

    const themeButton = screen.getByRole('button', { name: /Dark/i });
    fireEvent.click(themeButton);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  test('calls logout when logout button is clicked', () => {
    renderNavbar(true, 'dark');

    const logoutButton = screen.getByText(/Logout/i);
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
