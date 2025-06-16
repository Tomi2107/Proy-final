// src/componentes/Usuarios/RequireAuth.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children, rolRequerido }) => {
  const location = useLocation();
  let usuario;

  try {
    usuario = JSON.parse(localStorage.getItem("usuario"));
  } catch {
    usuario = null;
  }

  // No está logueado
  if (!usuario) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Está logueado pero no tiene el rol adecuado
  if (rolRequerido && usuario.rol !== rolRequerido) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
