import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { useList } from '../../contexts/ListContext';
import { WishlistItemPost } from '../../services/wishlistItemService';

const List = ({ isOpen, onClose }) => {
  const { List, removeFromList } = useList();

  const getTotalPrice = () => {
    return List.reduce((total, item) => total + parseFloat(item.productPrice) * item.quantity, 0);
  };

  const handleProceedToPayment = async () => {
    const user = sessionStorage.getItem('user'); 
    const WishlistItem = List.map(item => ({
      wishlistUserId: Number(user),
      wishlistProductId: item.productId
    }));

    const WishlistItems  = {
      wishlistItems: WishlistItem
    };

    try {
      const result = await WishlistItemPost(WishlistItems );
      alert('Lista creada con éxito');
      onClose();
    } catch (error) {
      alert('Error al crear la lista: ' + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden flex">
        <div className="w-1/2 p-4 max-h-[60vh] overflow-y-auto border-r border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Lista de deseados</h2>
          {List.length === 0 ? (
            <p className="text-gray-600 text-center py-4">Tu lista está vacía</p>
          ) : (
            List.map(item => (
              <div key={item.productId} className="flex justify-between items-center py-4 border-b border-gray-200">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.productName}</p>
                  <p className="text-sm text-gray-600">${parseFloat(item.productPrice).toLocaleString()} x {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => removeFromList(item.productId)} className="text-red-500 hover:text-red-700 transition-colors">Eliminar</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="w-1/2 p-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-xl font-bold text-gray-800">Total: ${getTotalPrice().toLocaleString()}</p>
            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleProceedToPayment}
            >
              Guardar lista
            </button>
            <button
              className="mt-2 w-full py-2 px-4 rounded-lg hover:bg-neutral-600 transition-colors"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default List;
