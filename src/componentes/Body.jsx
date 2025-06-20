import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

import Header from "./Header";
import Footer from "./Footer";

import Contacto from './Contacto';
import Nosotros from './Nosotros';
import Home from "./Home";
import Productos from "./Productos";
import DetalleProducto from './DetalleProducto'; // ajustá el path si cambia
import Carrito from "./Carrito";
import Registro from "./Usuarios/Registro";
import Login from "./Usuarios/Login";
import Admin from "./Admin";
import Api from "./Api";
import Perfil from "./Usuarios/Perfil";
import Settings from "./Usuarios/Settings";
import Listado from "./Listado";
import RequireAuth from "./Usuarios/RequireAuth";
import { Routes, Route  } from "react-router-dom";

import usuariosData from "./../data/usuarios.json";

const Body = () => {
  useEffect(() => {
    if (!localStorage.getItem("usuarios")) {
      localStorage.setItem("usuarios", JSON.stringify(usuariosData));
    }
  }, []);

  return (
      <main>
      <Header />
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route
            path="/carrito"
            element={
              <RequireAuth>
                <Carrito />
              </RequireAuth>
            }
          />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/api" element={<Api />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />

          {/* Rutas protegidas: requieren login */}
          <Route
            path="/perfil"
            element={
              <RequireAuth>
                <Perfil />
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
          <Route
            path="/listado"
            element={
              <RequireAuth>
                <Listado />
              </RequireAuth>
            }
          />
          {/* Ruta protegida: solo para admins */}
          <Route
            path="/admin"
            element={
              <RequireAuth rolRequerido="admin">
                <Admin />
              </RequireAuth>
            }
          />
        </Routes>
      </Container>
      <Footer />
      </main>
  );
};

export default Body;
