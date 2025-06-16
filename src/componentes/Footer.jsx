// src/componentes/Footer.jsx
import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-primary text-light py-3 mt-auto">
      <Container className="text-center">
        &copy; {new Date().getFullYear()} Mi Tienda – Todos los derechos reservados.
      </Container>
    </footer>
  );
};

export default Footer;
