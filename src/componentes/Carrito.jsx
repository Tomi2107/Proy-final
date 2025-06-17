import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge, Alert } from "react-bootstrap";
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

    actualizarCarrito();
    window.addEventListener("carritoActualizado", actualizarCarrito);
    return () => window.removeEventListener("carritoActualizado", actualizarCarrito);
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
      window.dispatchEvent(new Event("carritoActualizado"));
    });
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">🛒 Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <Alert variant="warning" className="text-center">
          ¡Tu carrito está vacío! Agrega algunos productos.
        </Alert>
      ) : (
        <Row>
          <Col md={8}>
            {carrito.map((producto) => (
              <Card className="mb-3" key={producto.id}>
                <Card.Body>
                  <Row className="align-items-center">
                    <Col md={3}>
                      <img
                        src={producto.imagen || "https://via.placeholder.com/100"}
                        alt={producto.nombre}
                        className="img-fluid rounded"
                      />
                    </Col>
                    <Col md={6}>
                      <h5>{producto.nombre || producto.name}</h5>
                      <p className="mb-1">
                        Precio unitario: ${producto.precio || producto.price || 100}
                      </p>
                      <p className="mb-1">
                        Cantidad:{" "}
                        <Badge bg="secondary">{producto.cantidad}</Badge>
                      </p>
                      <strong>
                        Subtotal: ${(producto.precio || producto.price || 100) * producto.cantidad}
                      </strong>
                    </Col>
                    <Col md={3} className="text-end">
                      <Button variant="danger" size="sm" onClick={() => eliminarDelCarrito(producto.id)}>
                        Eliminar
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}

            <div className="text-end mt-4">
              <h4>Total: <span className="text-success">${total.toFixed(2)}</span></h4>
            </div>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Resumen del Pedido</Card.Title>
                <p><strong>Productos:</strong> {carrito.length}</p>
                <p><strong>Total:</strong> ${total.toFixed(2)}</p>
                <Button variant="primary" className="w-100" onClick={procederAlPago}>
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
