import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Login.tsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
const Login = () => {
    const { handleLogin, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    // Redirigir si ya está logueado
    useEffect(() => {
        if (isLoggedIn)
            navigate('/', { replace: true });
    }, [isLoggedIn, navigate]);
    // Limpiar error al escribir
    useEffect(() => setError(''), [email, password]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await handleLogin(email, password);
            navigate('/');
        }
        catch (err) {
            setError(err.message || 'Error desconocido.');
        }
        finally {
            setLoading(false);
        }
    };
    const isFormValid = email.length > 0 && password.length > 0;
    return (_jsxs("div", { className: "p-6 max-w-md mx-auto mt-10 bg-white dark:bg-gray-900 rounded-2xl shadow-md", children: [_jsx("h1", { className: "text-2xl font-bold mb-6 text-center", children: "Iniciar Sesi\u00F3n" }), error && _jsx("p", { className: "text-red-600 text-sm text-center mb-4", children: error }), _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [_jsxs("label", { className: "flex flex-col", children: [_jsx("span", { className: "font-semibold", children: "Email" }), _jsxs("div", { className: "flex items-center border rounded px-2", children: [_jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, placeholder: "ejemplo@correo.com", "aria-invalid": !email, className: "p-2 w-full outline-none bg-transparent" }), _jsx(FontAwesomeIcon, { icon: !email ? faCircle : faCheck, className: `ml-2 ${!email ? 'text-gray-400' : 'text-green-500'}` })] })] }), _jsxs("label", { className: "flex flex-col", children: [_jsx("span", { className: "font-semibold", children: "Contrase\u00F1a" }), _jsxs("div", { className: "flex items-center border rounded px-2", children: [_jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "aria-invalid": !password, className: "p-2 w-full outline-none bg-transparent" }), _jsx(FontAwesomeIcon, { icon: !password ? faCircle : faCheck, className: `ml-2 ${!password ? 'text-gray-400' : 'text-green-500'}` })] })] }), _jsx("button", { type: "submit", className: `p-2 rounded text-white font-semibold transition ${isFormValid && !loading ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-500 cursor-not-allowed'}`, disabled: !isFormValid || loading, children: loading ? 'Verificando...' : 'Iniciar Sesión' })] }), _jsx("div", { className: "mt-6 text-center text-sm", children: _jsxs("p", { children: ["\u00BFNo tienes cuenta?", ' ', _jsx(Link, { to: "/register", className: "text-blue-600 font-semibold hover:underline", children: "Reg\u00EDstrate aqu\u00ED" })] }) })] }));
};
export default Login;
