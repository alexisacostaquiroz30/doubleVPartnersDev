import React from "react";
import '../styles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer p-4">
      <div className="footer-links">
        <a href="#about">Acerca de</a>
        <a href="#contact">Contacto</a>
        <a href="#privacy">Política de Privacidad</a>
      </div>
      <div className="footer-text">
        &copy; {new Date().getFullYear()} Double V Partners. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
