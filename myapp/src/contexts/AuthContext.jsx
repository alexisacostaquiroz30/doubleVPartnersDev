import React, { createContext, useState, useEffect } from 'react';
import { login, register } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = async (email, password) => {
    const loggedInUser = await login(email, password);
    setUser(loggedInUser);
  };

  const handleRegister = async (userData) => {
    const newUser = await register(userData);
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
