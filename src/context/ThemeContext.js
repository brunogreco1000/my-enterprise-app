import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useEffect } from 'react';
export const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => { },
});
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || saved === 'light')
            return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);
    const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    return (_jsx(ThemeContext.Provider, { value: { theme, toggleTheme }, children: children }));
};
