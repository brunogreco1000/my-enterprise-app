import React, { useContext, useState, memo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import classNames from 'classnames';

const Navbar: React.FC = () => {
  const { isLoggedIn, user, logout, isLoading } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const darkMode = theme === 'dark';
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: 'Dashboard', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderLinks = (onClick?: () => void) =>
    links.map((link) => (
      <NavLink
        key={link.path}
        to={link.path}
        onClick={onClick}
        className={({ isActive }) =>
          classNames(
            'px-2 py-1 rounded transition',
            isActive
              ? 'bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-800'
              : 'hover:bg-gray-600 dark:hover:bg-gray-700'
          )
        }
      >
        {link.name}
      </NavLink>
    ));

  const AuthButtons: React.FC<{ closeMenu?: () => void }> = ({ closeMenu }) => (
    <div className="flex gap-2 items-center">
      {isLoggedIn && user && !isLoading ? (
        <>
          <span className="font-semibold">Hi, {user.username}!</span>
          <button
            onClick={() => {
              handleLogout();
              closeMenu?.();
            }}
            className="bg-red-500 p-1 px-3 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink
            to="/login"
            onClick={closeMenu}
            className="hover:underline px-2 py-1 rounded transition"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            onClick={closeMenu}
            className="hover:underline px-2 py-1 rounded transition"
          >
            Register
          </NavLink>
        </>
      )}
      <button
        onClick={() => {
          toggleTheme();
          closeMenu?.();
        }}
        className="border px-2 py-1 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition ml-2"
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  );

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center px-6 relative">
      <div className="text-xl font-bold">My Enterprise App</div>

      <div className="hidden md:flex gap-4 items-center">
        {renderLinks()}
        <AuthButtons />
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl p-1"
          aria-label="Toggle menu"
        >
          {menuOpen ? '✖' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col gap-4 p-4 md:hidden z-50">
          {renderLinks(() => setMenuOpen(false))}
          <AuthButtons closeMenu={() => setMenuOpen(false)} />
        </div>
      )}
    </nav>
  );
};

export default memo(Navbar);
