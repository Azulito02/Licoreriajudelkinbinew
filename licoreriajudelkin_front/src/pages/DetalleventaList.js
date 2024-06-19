import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaPencil, FaTrashCan } from 'react-icons/fa6';

function DetalleventaList({rol}) {
  const [Detalleventas, setDetalleventa] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDetalleventa, setSelectedDetalleventa] = useState({});
  const [formData, setFormData] = useState({
    cantidad: '',
    precio: '',
  });

  // Función para abrir el modal y pasar los datos del docente seleccionado
  const openModal = (detalleventa) => {
    setSelectedDetalleventa(detalleventa);

    setFormData({
      cantidad: detalleventa.cantidad,
      precio: detalleventa.precio,
    });
    setShowModal(true);
  };


  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadDetalleventa = () => {
    fetch('http://localhost:5000/crud/readdetalleventa')
      .then((response) => response.json())
      .then((data) => setDetalleventa(data))
      .catch((error) => console.error('Error al obtener Detalle de la venta:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updatedetalleventa/${selectedDetalleventa.iddetalleventa}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de docentes
          setShowModal(false);
          loadDetalleventa(); // Cargar la lista de docentes actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un docente
  const handleDelete = (iddetalleventa) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este detalle de venta?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el docente
      fetch(`http://localhost:5000/crud/deletedetalleventa/${iddetalleventa}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de docentes
            loadDetalleventa();
          }
        })
        .catch((error) => console.error('Error al eliminar el detalle de venta:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los docentes
  useEffect(() => {
    fetch('http://localhost:5000/crud/readdetalleventa')
      .then((response) => response.json())
      .then((data) => setDetalleventa(data))
      .catch((error) => console.error('Error al obtener el detalle de la venta:', error));
  }, []);

  return (
    <div>
      <Header rol={rol}/>

      <Card className="margen-contenedor">
        <Card.Body>
          <Card.Title className="mb-3">Listar Detalle de venta</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {Detalleventas.map((detalleventa) => (
                <tr key={detalleventa.iddetalleventa}>
                  <td>{detalleventa.iddetalleventa}</td>
                  <td>{detalleventa.cantidad}</td>
                  <td>{detalleventa.precio}</td>
                  <td className='center-button'>
                    <Button variant="primary" className='margin-button' onClick={() => openModal(detalleventa)}><FaPencil /></Button>
                    <Button variant="danger" className='margin-button' onClick={() => handleDelete(detalleventa.iddetalleventa)}><FaTrashCan /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Detalle de venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>actualización de detalle de venta</Card.Title>
                    <Form className="mt-3">
                        <Row className="g-3">

                            <Col sm="6" md="6" lg="6">
                                <FloatingLabel controlId="cantidad" label="Cantidad">
                                    <Form.Control
                                    type="number"
                                    placeholder="Ingrese la cantidad"
                                    value={formData.cantidad}
                                    name="cantidad"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="6" md="6" lg="6">
                                <FloatingLabel controlId="precio" label="Precio">
                                    <Form.Control
                                    type="number"
                                    placeholder="Ingrese el precio"
                                    value={formData.precio}
                                    name="precio"
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

    </div>
  );
}

export default DetalleventaList;