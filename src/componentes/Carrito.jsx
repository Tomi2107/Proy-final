import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup, Alert } from "react-bootstrap";
import Swal from "sweetalert2";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

useEffect(() => {
  const actualizarCarrito = () => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
    calcularTotal(carritoGuardado);
  };

  actualizarCarrito(); // Al montar

  // Escuchar evento personalizado
  window.addEventListener("carritoActualizado", actualizarCarrito);

  return () => {
    window.removeEventListener("carritoActualizado", actualizarCarrito);
  };
}, []);



  const calcularTotal = (carrito) => {
    const totalCarrito = carrito.reduce(
      (sum, producto) => sum + (producto.precio || producto.price || 100) * producto.cantidad,
      0
    );
    setTotal(totalCarrito);
  };

  const eliminarDelCarrito = (id) => {
    Swal.fire({
      title: "¿Eliminar del carrito?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    }).then((res) => {
      if (res.isConfirmed) {
        const nuevoCarrito = carrito.filter((producto) => producto.id !== id);
        setCarrito(nuevoCarrito);
        localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
        calcularTotal(nuevoCarrito);
        Swal.fire("Producto eliminado", "", "success");
      }
    });
  };

  const procederAlPago = () => {
  Swal.fire({
    title: "¡Pago Realizado!",
    text: "El pedido será enviado a la dirección registrada.",
    icon: "success",
    confirmButtonText: "Aceptar",
  }).then(() => {
    setCarrito([]);
    localStorage.setItem("carrito", JSON.stringify([]));
    setTotal(0);
    window.dispatchEvent(new Event("carritoActualizado")); // ✅ Notifica el cambio
  });
  };


  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <Alert variant="warning" className="text-center">
          ¡Tu carrito está vacío! Agrega algunos productos.
        </Alert>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup>
              {carrito.map((producto) => (
                <ListGroup.Item key={producto.id}>
                  <Row>
                    <Col md={8}>
                      <strong>{producto.nombre || producto.name}</strong>
                      <br />
                      Precio unitario: ${producto.precio || producto.price || 100} x {producto.cantidad}
                      <br />
                      <strong>Subtotal:</strong> ${(producto.precio || producto.price || 100) * producto.cantidad}
                    </Col>
                    <Col md={4} className="text-end">
                      <Button variant="danger" size="sm" onClick={() => eliminarDelCarrito(producto.id)}>
                        Eliminar
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div className="text-end mt-4">
              <h4>Total: ${total.toFixed(2)}</h4>
            </div>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Resumen del Pedido</Card.Title>
                <Card.Text>
                  <strong>Total de Productos:</strong> {carrito.length}
                </Card.Text>
                <Button variant="primary" block onClick={procederAlPago}>
                  Proceder al Pago
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Carrito;
