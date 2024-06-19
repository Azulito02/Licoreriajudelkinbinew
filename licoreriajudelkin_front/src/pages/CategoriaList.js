import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaPencil, FaTrashCan } from 'react-icons/fa6';

function CategoriaList({ rol }) {
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState({});
  const [formData, setFormData] = useState({
    nombre_categoria: '',
  });

  // Crear busqueda

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredcategoria = categorias.filter((categorias) => {
   // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
   const idcategoria = categorias.idcategoria;
   const nombre_categoria = categorias.nombre_categoria?.toLowerCase(); 
   const search = searchQuery.toLowerCase();
 
   // Verifica si la cadena de búsqueda se encuentra en algún campo
   return (
     idcategoria === search ||
     nombre_categoria?.includes(search) 
   );
 });

  const openModal = (categoria) => {
    setSelectedCategoria(categoria);
    setFormData({
      nombre_categoria: categoria.nombre_categoria,
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadCategorias = () => {
    fetch('http://localhost:5000/crud/readcategoria')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategorias(data);
        } else {
          console.error('La respuesta de la API no es un array:', data);
        }
      })
      .catch((error) => console.error('Error al obtener categorias:', error));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/crud/updatecategoria/${selectedCategoria.idcategoria}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadCategorias();
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  const handleDelete = (idcategoria) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar esta categoria?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/deletecategoria/${idcategoria}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            loadCategorias();
          }
        })
        .catch((error) => console.error('Error al eliminar la marca:', error));
    }
  };

  useEffect(() => {
    loadCategorias();
  }, []);

  return (
      <div>
        <Header rol={rol}/>
        <Container>
        <Card className="margen-contenedor">
          <Card.Body>
            <Card.Title className="mb-3">Listado de categoria</Card.Title>
            <Row className="mb-3">
              <Col sm="6" md="6" lg="4">
                <FloatingLabel controlId="search" label="Buscar">
                  <Form.Control
                    type="text"
                    placeholder="Buscar"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombres</th>
              </tr>
            </thead>
            <tbody>
              {filteredcategoria.map((categoria) => (
                <tr key={categoria.idcategoria}>
                  <td>{categoria.idcategoria}</td>
                  <td>{categoria.nombre_categoria}</td>
                  <td>
                    <Button variant="primary" className="margin-button" onClick={() => openModal(categoria)}>
                      <FaPencil />
                    </Button>
                    <Button variant="danger" className="margin-button" onClick={() => handleDelete(categoria.idcategoria)}>
                      <FaTrashCan />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Actualización de Categoría</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="nombre_categoria" label="Nombre">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre de la categoría"
                        value={formData.nombre_categoria}
                        name="nombre_categoria"
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>

      </Container>

      
    </div>
  );
}

export default CategoriaList;
