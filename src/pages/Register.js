import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Register.tsx
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faCircle } from '@fortawesome/free-solid-svg-icons';
import { api } from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,24}$/;
const InputField = ({ label, type, value, setValue, valid, placeholder, required, inputRef, showValidIcon = true }) => (_jsxs("label", { className: "flex flex-col", children: [_jsx("span", { className: "font-semibold", children: label }), _jsxs("div", { className: "flex items-center border rounded px-2", children: [_jsx("input", { ref: inputRef, type: type, value: value, onChange: (e) => setValue(e.target.value), "aria-invalid": !valid, required: required, placeholder: placeholder, className: "p-2 w-full outline-none bg-transparent" }), showValidIcon && (_jsx(FontAwesomeIcon, { icon: valid ? faCheck : value ? faTimes : faCircle, className: `ml-2 ${valid ? 'text-green-500' : value ? 'text-red-500' : 'text-gray-400'}` }))] })] }));
const Register = () => {
    const navigate = useNavigate();
    const { handleLogin } = useAuth();
    const userRef = useRef(null);
    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirm, setValidConfirm] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    useEffect(() => { if (userRef.current)
        userRef.current.focus(); }, []);
    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
        setValidEmail(EMAIL_REGEX.test(email));
        setValidPassword(PWD_REGEX.test(password));
        setValidConfirm(password === confirmPassword && confirmPassword.length > 0);
    }, [username, email, password, confirmPassword]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validUsername || !validEmail || !validPassword || !validConfirm) {
            setError('Por favor, corrige los campos marcados antes de continuar.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const response = await api.post('/auth/register', { username, email, password });
            if (response.status === 201 && response.data.user) {
                await handleLogin(email, password);
                setSuccess('Cuenta creada correctamente. Revisa tu correo para confirmar la cuenta.');
                setTimeout(() => navigate('/'), 1000);
            }
        }
        catch (err) {
            setError(err.response?.data?.message || 'Error al registrar. Intenta nuevamente.');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "p-6 max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md", children: [_jsx("h1", { className: "text-2xl font-bold mb-4 text-center", children: "Crear cuenta" }), _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [_jsx(InputField, { label: "Username", type: "text", value: username, setValue: setUsername, valid: validUsername, placeholder: "Tu nombre de usuario", required: true, inputRef: userRef }), _jsx(InputField, { label: "Email", type: "email", value: email, setValue: setEmail, valid: validEmail, placeholder: "ejemplo@correo.com", required: true }), _jsx(InputField, { label: "Contrase\u00F1a", type: "password", value: password, setValue: setPassword, valid: validPassword, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", required: true }), _jsx(InputField, { label: "Confirmar contrase\u00F1a", type: "password", value: confirmPassword, setValue: setConfirmPassword, valid: validConfirm, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", required: true }), error && _jsx("p", { className: "text-red-600 text-sm text-center", children: error }), success && _jsx("p", { className: "text-green-600 text-sm text-center", children: success }), _jsx("button", { type: "submit", className: `p-2 rounded text-white font-semibold transition ${validUsername && validEmail && validPassword && validConfirm
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-gray-500 cursor-not-allowed'}`, disabled: !validUsername || !validEmail || !validPassword || !validConfirm || loading, children: loading ? 'Registrando...' : 'Registrarse' })] })] }));
};
export default Register;
