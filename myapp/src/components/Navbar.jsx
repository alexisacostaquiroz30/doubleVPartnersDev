import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useList } from '../contexts/ListContext';
import Cart from '../pages/List/List';
import RegisterModal from '../pages/Auth/RegisterModal';
import LoginModal from '../pages/Auth/LoginModal';
import LogoutModal from '../pages/Auth/LogoutModal'; 
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const { List } = useList();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = () => {
    const token = sessionStorage.getItem('access');
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkAuthentication();
    window.addEventListener('storage', checkAuthentication);
    return () => {
      window.removeEventListener('storage', checkAuthentication);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleConfirmLogout = async () => {
    try {
      sessionStorage.removeItem('access');
      sessionStorage.removeItem('user');
      setIsAuthenticated(false);
      setLogoutModalOpen(false);
      alert('Sesión cerrada con éxito');
    } catch (error) {
      alert('Error al cerrar sesión: ' + error.message);
    }
  };

  const handleLoginSuccess = () => {
    checkAuthentication();
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <img src="https://cdn.prod.website-files.com/659d68c6da3f511b9d5f58f7/65b9585a085656d99065862f_Logo-double-v-partners.png" loading="lazy" alt="" class="image-67"/>
        </div>
        <button className="menu-button" onClick={toggleMenu}>
          {isOpen ? "Cerrar" : "Menú"}
        </button>
        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          <div className="nav-links">
            <Link to="/">Inicio</Link>
            <Link to="/cart/history">Historial</Link>
            <Link onClick={toggleCart} className="cart-button">
              Lista de Deseos ({List.reduce((total, item) => total + item.quantity, 0)})
            </Link>
          </div>
          <div className="auth-links">
            {!isAuthenticated ? (
              <>
                <Link onClick={() => setLoginModalOpen(true)} className="auth-link">Iniciar Sesión</Link>
                <Link onClick={() => setRegisterModalOpen(true)} className="auth-link register-button">Registro</Link>
              </>
            ) : (
              <Link onClick={() => setLogoutModalOpen(true)} className="auth-link logout-button">Cerrar Sesión</Link>
            )}
          </div>
        </div>
      </nav>
      
      <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)} />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
      <LogoutModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setLogoutModalOpen(false)} 
        onConfirmLogout={handleConfirmLogout}
      />
    </>
  );
};

export default Navbar;