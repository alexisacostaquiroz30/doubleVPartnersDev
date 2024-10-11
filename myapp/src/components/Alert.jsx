// src/components/Alert.jsx
import React from 'react';

const Alert = ({ message, type, onClose }) => {
  return (
    <div
      className={`p-4 mb-4 rounded-lg ${
        type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-sm font-medium underline cursor-pointer"
      >
        Cerrar
      </button>
    </div>
  );
};

export default Alert;
