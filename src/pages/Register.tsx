// src/pages/Register.tsx
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faCircle } from '@fortawesome/free-solid-svg-icons';
import {api} from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,24}$/;

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  valid: boolean;
  placeholder?: string;
  required?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  showValidIcon?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label, type, value, setValue, valid, placeholder, required, inputRef, showValidIcon = true
}) => (
  <label className="flex flex-col">
    <span className="font-semibold">{label}</span>
    <div className="flex items-center border rounded px-2">
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-invalid={!valid}
        required={required}
        placeholder={placeholder}
        className="p-2 w-full outline-none bg-transparent"
      />
      {showValidIcon && (
        <FontAwesomeIcon
          icon={valid ? faCheck : value ? faTimes : faCircle}
          className={`ml-2 ${valid ? 'text-green-500' : value ? 'text-red-500' : 'text-gray-400'}`}
        />
      )}
    </div>
  </label>
);

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth(); 
  const userRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => { if (userRef.current) userRef.current.focus(); }, []);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
    setValidEmail(EMAIL_REGEX.test(email));
    setValidPassword(PWD_REGEX.test(password));
    setValidConfirm(password === confirmPassword && confirmPassword.length > 0);
  }, [username, email, password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrar. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Crear cuenta</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          label="Username"
          type="text"
          value={username}
          setValue={setUsername}
          valid={validUsername}
          placeholder="Tu nombre de usuario"
          required
          inputRef={userRef}
        />
        <InputField
          label="Email"
          type="email"
          value={email}
          setValue={setEmail}
          valid={validEmail}
          placeholder="ejemplo@correo.com"
          required
        />
        <InputField
          label="Contraseña"
          type="password"
          value={password}
          setValue={setPassword}
          valid={validPassword}
          placeholder="••••••••"
          required
        />
        <InputField
          label="Confirmar contraseña"
          type="password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          valid={validConfirm}
          placeholder="••••••••"
          required
        />

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center">{success}</p>}

        <button
          type="submit"
          className={`p-2 rounded text-white font-semibold transition ${
            validUsername && validEmail && validPassword && validConfirm
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-500 cursor-not-allowed'
          }`}
          disabled={!validUsername || !validEmail || !validPassword || !validConfirm || loading}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
};

export default Register;
