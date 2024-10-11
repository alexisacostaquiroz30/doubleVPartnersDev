
import React, { useState } from 'react';
import { register } from '../../services/authService';
import Alert from '../../components/Alert';

const RegisterModal = ({ isOpen, onClose }) => {
  const [userName, setuserName] = useState('');
  const [userPassword, setuserPassword] = useState('');
  const [confirmuserPassword, setConfirmuserPassword] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !userPassword || !userEmail || !confirmuserPassword) {
      setError('Por favor, llena todos los campos.');
      return;
    }

    if (!/^[a-zA-Z0-9]+$/.test(userName)) {
      setError('El userName solo puede contener letras y números.');
      return;
    }

    if (userPassword !== confirmuserPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const userData = {
      userName,
      userPassword,
      userEmail,
    };

    try {
      const response = await register(userData);

      if (response.status === 201) {
        setSuccess('Usuario creado correctamente!')
        setError('')
        onClose()

        setuserName('');
        setuserPassword('');
        setConfirmuserPassword('');
        setuserEmail('');
      } else {
        setError('Error en el registro. Por favor, intenta de nuevo.');
      }
    } catch (err) {
      const parsedErrors = JSON.parse(err.message);
      setError(parsedErrors[0])
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
        <h2 className="text-xl font-semibold mb-4">Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">UserName:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="userEmail"
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
          <div className="mb-4">
            <label htmlFor="confirmuserPassword" className="block text-sm font-medium text-gray-700">Repetir Contraseña:</label>
            <input
              type="password"
              id="confirmuserPassword"
              name="confirmuserPassword"
              value={confirmuserPassword}
              onChange={(e) => setConfirmuserPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">
              Cancelar
            </button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Registrarse</button>
          </div>
        </form>
        {/* Componente de Alerta */}
        {success && (
          <Alert message={success} type="success" onClose={handleCloseNotification} />
        )}
        {error && (
          <Alert message={error} type="error" onClose={handleCloseNotification} />
        )}
      </div>
    </div>
  );
};

export default RegisterModal;
