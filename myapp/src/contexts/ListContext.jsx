// src/context/ListContext.js
import React, { createContext, useState, useContext } from 'react';

const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [List, setList] = useState([]);

  const addToList = (product) => {
    setList(prevList => {
      const existingProduct = prevList.find(item => item.productId === product.productId);
      
      if (existingProduct) {
        return prevList; 
      }
      
      return [...prevList, {...product, quantity: 1}]; 
    });
  };
  

  const removeFromList = (productId) => {
    setList(prevList => prevList.filter(item => item.productId !== productId));
  };


  return (
    <ListContext.Provider value={{ List, addToList, removeFromList }}>
      {children}
    </ListContext.Provider>
  );
};

export const useList = () => useContext(ListContext);