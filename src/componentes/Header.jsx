import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
} from "react-bootstrap";
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  const [user, setUser] = useState(null);
  const [carrito, setCarrito] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("usuario"));
      setUser(storedUser);
    };

    const updateCarrito = () => {
      const storedCart = JSON.parse(localStorage.getItem("carrito")) || [];
      setCarrito(storedCart.length);
    };

    updateUser();
    updateCarrito();

    window.addEventListener("authChange", updateUser);
    window.addEventListener("carritoActualizado", updateCarrito);

    return () => {
      window.removeEventListener("authChange", updateUser);
      window.removeEventListener("carritoActualizado", updateCarrito);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    window.dispatchEvent(new Event("authChange")); // 🔥 Notificar logout
    navigate("/");
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Mi Tienda</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/api">API</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
            {user && <Nav.Link as={Link} to="/listado">Listado</Nav.Link>}
            {user?.rol === "admin" && <Nav.Link as={Link} to="/admin">Admin</Nav.Link>}

            {!user && (
              <NavDropdown title="Usuarios" id="usuarios-dropdown">
                <NavDropdown.Item as={Link} to="/registro">Registro</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          <Nav className="ms-auto">
           {user && (
          <Nav.Link as={Link} to="/carrito">
            <FaShoppingCart size={22} />
            <Badge bg="success" className="ms-1">{carrito}</Badge>
          </Nav.Link>
        )}


            {/* Perfil y salir si logueado */}
            {user ? (
              <>
                <Nav.Link as={Link} to="/perfil">Perfil</Nav.Link>
                <Nav.Link onClick={handleLogout}>Salir</Nav.Link>
              </>
            ) : (
              <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
