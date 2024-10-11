// src/components/LogoutModal.jsx
import React from 'react';

const LogoutModal = ({ isOpen, onClose, onConfirmLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Cerrar Sesión</h2>
        <p className="mb-4">¿Estás seguro de que deseas cerrar sesión?</p>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">
            No
          </button>
          <button
            onClick={onConfirmLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
            Sí, cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
