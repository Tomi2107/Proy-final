import React, { useEffect, useState } from "react";
import { Container, Form, Button, Table, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

const API_URL = "https://68056fddca467c15be691494.mockapi.io/productos";

const Admin = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    stock: "",
  });

  // Traer productos de MockAPI
  const fetchProductos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProductos(data);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(form.precio) <= 0 || Number(form.stock) < 0) {
      Swal.fire("Error", "Precio debe ser mayor a 0 y stock no puede ser negativo.", "error");
      return;
    }

    if (form.id) {
      // PUT
      await fetch(`${API_URL}/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      Swal.fire("Producto editado", "", "success");
    } else {
      // POST
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      Swal.fire("Producto agregado", "", "success");
    }

    setForm({ id: null, nombre: "", descripcion: "", precio: "", imagen: "", stock: "" });
    fetchProductos();
  };

  const handleEdit = (producto) => {
    setForm(producto);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Eliminar producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        Swal.fire("Eliminado", "", "success");
        fetchProductos();
      }
    });
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Panel de Administración</h2>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={2} className="mb-3">
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="nombre" value={form.nombre} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col xs={12} md={2} className="mb-3">
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control name="descripcion" value={form.descripcion} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col xs={6} md={1} className="mb-3">
            <Form.Group>
              <Form.Label>Precio</Form.Label>
              <Form.Control name="precio" type="number" value={form.precio} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col xs={12} md={2} className="mb-3">
            <Form.Group>
              <Form.Label>Imagen (URL)</Form.Label>
              <Form.Control name="imagen" value={form.imagen} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col xs={6} md={1} className="mb-3">
            <Form.Group>
              <Form.Label>Stock</Form.Label>
              <Form.Control name="stock" type="number" value={form.stock} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col xs={12} md={2} className="d-flex align-items-end mb-3">
            <Button type="submit" variant="success" className="w-100">
              {form.id ? "Editar" : "Agregar"}
            </Button>
          </Col>
        </Row>
      </Form>


      <hr />

      <h4 className="mt-4">Lista de productos</h4>
    <div className="table-responsive">  
      <Table striped bordered hover responsive>
        <thead><tr><th>Imagen</th><th>Nombre</th><th>Descripción</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr></thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td><img src={p.imagen} alt={p.nombre} width="80" height="80" /></td>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>${p.precio}</td>
              <td>{p.stock}</td>
              <td>
                <div className="d-flex flex-column flex-md-row gap-2">
                  <Button variant="warning" size="sm" onClick={() => handleEdit(p)}>
                    Editar
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>
                    Borrar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </Container>
  );
};

export default Admin;
