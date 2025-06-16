// ===================== Productos.jsx =====================
import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

const API_URL = "https://68056fddca467c15be691494.mockapi.io/productos";
const usuario = JSON.parse(localStorage.getItem("usuario"));

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductos = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch(() => {
        setError("Error al cargar productos.");
        setCargando(false);
      });
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const agregarAlCarrito = async (producto) => {
    if (producto.stock <= 0) {
      Swal.fire("Sin stock", "Este producto está agotado.", "error");
      return;
    }

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existe = carrito.find(p => p.id === producto.id);

    if (existe) {
      existe.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    const nuevoStock = producto.stock - 1;

    await fetch(`${API_URL}/${producto.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...producto, stock: nuevoStock }),
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.dispatchEvent(new Event("carritoActualizado")); // 🔔 notifica a otros componentes
    fetchProductos();


    Swal.fire({
      title: '¡Producto agregado!',
      text: `${producto.nombre} fue agregado al carrito.`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  };

  if (cargando) return <p className="m-4">Cargando productos...</p>;
  if (error) return <p className="m-4 text-danger">{error}</p>;

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Listado de Productos</h2>
      <Row>
        {productos.map((producto) => (
          <Col key={producto.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
                <Card.Img
                  variant="top"
                  src={producto.imagen || "https://picsum.photos/110/?random"}
                  style={{ height: "200px", objectFit: "cover" }}
                />              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>Precio: ${producto.precio}</Card.Text>
                <Card.Text>Stock: {producto.stock}</Card.Text>
                {usuario && (
                  <Button variant="primary" onClick={() => agregarAlCarrito(producto)} disabled={producto.stock === 0}>
                    Agregar al carrito
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Productos;
