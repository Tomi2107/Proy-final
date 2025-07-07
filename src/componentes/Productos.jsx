import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet'; // 💡 SEO
import { Link } from 'react-router-dom';
import Paginador from './Paginador';

const API_URL = "https://68056fddca467c15be691494.mockapi.io/productos";


const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUsuario = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(storedUsuario);
  }, []);
  
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
    window.dispatchEvent(new Event("carritoActualizado"));
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

  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 20;

  const productosFiltrados = productos.filter(p =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const indiceInicial = (paginaActual - 1) * productosPorPagina;
  const productosEnPagina = productosFiltrados.slice(indiceInicial, indiceInicial + productosPorPagina);

  if (cargando) return <p className="m-4">Cargando productos...</p>;
  if (error) return <p className="m-4 text-danger">{error}</p>;

  return (
    <Container className="mt-4">
      {/* SEO con React Helmet */}
      <Helmet>
        <title>Productos | Talento Lab</title>
        <meta name="description" content="Explora nuestra selección de productos únicos y agregalos al carrito." />
      </Helmet>

      <h2 className="mb-4">Listado de Productos</h2>

      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Buscar producto por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          aria-label="Buscar productos"
        />
      </Form>

      <Row>
          {productosEnPagina.length === 0 ? (
            <p>No se encontraron productos con ese nombre.</p>
          ) : (
            productosEnPagina.map((producto) => (
            <Col key={producto.id} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Link to={`/productos/${producto.id}`}>
                  <Card.Img
                    variant="top"
                    src={producto.imagen || "https://picsum.photos/110/?random"}
                    style={{ height: "200px", objectFit: "cover" }}
                    alt={`Imagen de ${producto.nombre}`}
                  />
                </Link>
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Text>Precio: ${producto.precio}</Card.Text>
                  <Card.Text>Stock: {producto.stock}</Card.Text>
                  {usuario && (
                    <Button
                      variant="primary"
                      onClick={() => agregarAlCarrito(producto)}
                      disabled={producto.stock === 0}
                      aria-label={`Agregar ${producto.nombre} al carrito`}
                    >
                      Agregar al carrito
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    <Paginador
      totalPaginas={totalPaginas}
      paginaActual={paginaActual}
      cambiarPagina={setPaginaActual}
    />

    </Container>
  );
};

export default Productos;
