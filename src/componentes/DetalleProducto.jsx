import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const API_URL = "https://68056fddca467c15be691494.mockapi.io/productos";

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUsuario = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(storedUsuario);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setProducto(data))
      .catch(() => Swal.fire("Error", "No se pudo cargar el producto", "error"));
  }, [id]);

  const handleAgregar = async () => {
    if (!producto || cantidad < 1 || cantidad > producto.stock) return;

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existe = carrito.find((p) => p.id === producto.id);

    if (existe) {
      existe.cantidad += cantidad;
    } else {
      carrito.push({ ...producto, cantidad });
    }

    const nuevoStock = producto.stock - cantidad;

    await fetch(`${API_URL}/${producto.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...producto, stock: nuevoStock }),
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.dispatchEvent(new Event("carritoActualizado"));

    Swal.fire("Producto agregado", `${producto.nombre} x${cantidad}`, "success");
    navigate("/productos"); // Opcional: volver a productos
  };

  if (!producto) return <Container className="my-4">Cargando producto...</Container>;

  return (
    
    <Container className="my-4">
      <Helmet>
        <title>{producto.nombre} | Talento Lab</title>
        <meta name="description" content={`Compra ${producto.nombre} por solo $${producto.precio}.`} />
      </Helmet>
     <Button
        variant="primary"
        className="mb-3"
        onClick={() => navigate(-1)}
        aria-label="Volver a la lista de productos"
      >
        ← Volver
      </Button>
      <Row>
        <Col md={6} className="d-flex justify-content-center align-items-center">
            <Image
                src={producto.imagen || "https://via.placeholder.com/400"}
                alt={`Imagen de ${producto.nombre}`}
                fluid
                style={{ maxHeight: "400px", width: "auto", objectFit: "contain" }}
            />
        </Col>
        <Col md={6}>
          <h2>{producto.nombre}</h2>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
          <p><strong>Precio:</strong> ${producto.precio}</p>
          <p><strong>Stock disponible:</strong> {producto.stock}</p>

          {usuario ? (
            <>
              <Form.Group className="mb-3" controlId="cantidadProducto">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  max={producto.stock}
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                  aria-label="Cantidad de unidades a comprar"
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={handleAgregar}
                disabled={cantidad < 1 || cantidad > producto.stock}
                aria-label="Agregar producto al carrito"
              >
                Agregar al carrito
              </Button>
            </>
          ) : (
            <p className="text-danger mt-3">Debes iniciar sesión para comprar.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DetalleProducto;
