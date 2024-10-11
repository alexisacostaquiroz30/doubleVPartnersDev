import React, { useState } from 'react';
import { login } from '../../services/authService';
import Alert from '../../components/Alert';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [userEmail, setuserEmail] = useState('');
  const [userPassword, setuserPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userEmail || !userPassword) {
      setError('Por favor, ingresa tu usuario y contraseña.');
      return;
    }

    const loginData = {
      userEmail,
      userPassword,
    };

    try {
      const response = await login(loginData);
      if (response.token) {
        sessionStorage.setItem('access', response.token);
        sessionStorage.setItem('user', response.userId);

        setSuccess('Inicio de sesión exitoso!');
        setError('');

        if (onLoginSuccess) {
          onLoginSuccess();
        }

        onClose();
        setuserEmail('');
        setuserPassword('');
      } else {
        setError('Error en el inicio de sesión. Inténtalo nuevamente.');
      }
    } catch (err) {
      setError('Error en el inicio de sesión: ' + err.message);
      setSuccess('');
    }
  };

  const handleCloseNotification = () => {
    setError('');
    setSuccess('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">Usuario:</label>
            <input
              type="text"
              id="userEmail"
              name="userEmail"
              value={userEmail}
              onChange={(e) => setuserEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="userPassword" className="block text-sm font-medium text-gray-700">Contraseña:</label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              value={userPassword}
              onChange={(e) => setuserPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">
              Cancelar
            </button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
              Iniciar Sesión
            </button>
          </div>
        </form>
        {/* Componente de Alerta */}
        {success && <Alert message={success} type="success" onClose={handleCloseNotification} />}
        {error && <Alert message={error} type="error" onClose={handleCloseNotification} />}
      </div>
    </div>
  );
};

export default LoginModal;
