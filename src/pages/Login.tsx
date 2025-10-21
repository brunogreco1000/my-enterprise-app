// src/pages/Login.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheck } from '@fortawesome/free-solid-svg-icons';

const Login: React.FC = () => {
  const { handleLogin, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirigir si ya está logueado
  useEffect(() => {
    if (isLoggedIn) navigate('/', { replace: true });
  }, [isLoggedIn, navigate]);

  // Limpiar error al escribir
  useEffect(() => setError(''), [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await handleLogin(email, password); 
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Error desconocido.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = email.length > 0 && password.length > 0;

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
      {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="font-semibold">Email</span>
          <div className="flex items-center border rounded px-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ejemplo@correo.com"
              aria-invalid={!email}
              className="p-2 w-full outline-none bg-transparent"
            />
            <FontAwesomeIcon
              icon={!email ? faCircle : faCheck}
              className={`ml-2 ${!email ? 'text-gray-400' : 'text-green-500'}`}
            />
          </div>
        </label>

        <label className="flex flex-col">
          <span className="font-semibold">Contraseña</span>
          <div className="flex items-center border rounded px-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              aria-invalid={!password}
              className="p-2 w-full outline-none bg-transparent"
            />
            <FontAwesomeIcon
              icon={!password ? faCircle : faCheck}
              className={`ml-2 ${!password ? 'text-gray-400' : 'text-green-500'}`}
            />
          </div>
        </label>

        <button
          type="submit"
          className={`p-2 rounded text-white font-semibold transition ${
            isFormValid && !loading ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-500 cursor-not-allowed'
          }`}
          disabled={!isFormValid || loading}
        >
          {loading ? 'Verificando...' : 'Iniciar Sesión'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <p>
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
