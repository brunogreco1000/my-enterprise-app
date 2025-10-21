import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useState, memo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import classNames from 'classnames';
const Navbar = () => {
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
    const renderLinks = (onClick) => links.map((link) => (_jsx(NavLink, { to: link.path, onClick: onClick, className: ({ isActive }) => classNames('px-2 py-1 rounded transition', isActive
            ? 'bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-800'
            : 'hover:bg-gray-600 dark:hover:bg-gray-700'), children: link.name }, link.path)));
    const AuthButtons = ({ closeMenu }) => (_jsxs("div", { className: "flex gap-2 items-center", children: [isLoggedIn && user && !isLoading ? (_jsxs(_Fragment, { children: [_jsxs("span", { className: "font-semibold", children: ["Hi, ", user.username, "!"] }), _jsx("button", { onClick: () => {
                            handleLogout();
                            closeMenu?.();
                        }, className: "bg-red-500 p-1 px-3 rounded hover:bg-red-600 transition", children: "Logout" })] })) : (_jsxs(_Fragment, { children: [_jsx(NavLink, { to: "/login", onClick: closeMenu, className: "hover:underline px-2 py-1 rounded transition", children: "Login" }), _jsx(NavLink, { to: "/register", onClick: closeMenu, className: "hover:underline px-2 py-1 rounded transition", children: "Register" })] })), _jsx("button", { onClick: () => {
                    toggleTheme();
                    closeMenu?.();
                }, className: "border px-2 py-1 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition ml-2", children: darkMode ? '☀️ Light' : '🌙 Dark' })] }));
    return (_jsxs("nav", { className: "bg-gray-800 text-white p-4 flex justify-between items-center px-6 relative", children: [_jsx("div", { className: "text-xl font-bold", children: "My Enterprise App" }), _jsxs("div", { className: "hidden md:flex gap-4 items-center", children: [renderLinks(), _jsx(AuthButtons, {})] }), _jsx("div", { className: "md:hidden", children: _jsx("button", { onClick: () => setMenuOpen(!menuOpen), className: "text-2xl p-1", "aria-label": "Toggle menu", children: menuOpen ? '✖' : '☰' }) }), menuOpen && (_jsxs("div", { className: "absolute top-16 left-0 w-full bg-gray-800 flex flex-col gap-4 p-4 md:hidden z-50", children: [renderLinks(() => setMenuOpen(false)), _jsx(AuthButtons, { closeMenu: () => setMenuOpen(false) })] }))] }));
};
export default memo(Navbar);
