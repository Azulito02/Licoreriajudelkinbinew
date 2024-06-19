import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaPencil, FaTrashCan } from 'react-icons/fa6';

function VentaList({rol}) {
  const [Venta, setVenta] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState({});
  const [formData, setFormData] = useState({
    fecha: '',
    tipo_de_venta: '',
  });

  
  // Función para abrir el modal y pasar los datos del docente seleccionado
  const openModal = (venta) => {
    setSelectedVenta(venta);

    // Formatea la fecha para el campo "Fecha"
    const formattedFecha = formatDateForInput(venta.fecha);

    setFormData({
      fecha: formattedFecha,
      tipo_de_venta: venta.tipo_de_venta,
    });
    setShowModal(true);
  };

  function formatDateForInput(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Agregar ceros iniciales
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadVenta = () => {
    fetch('http://localhost:5000/crud/readventa')
      .then((response) => response.json())
      .then((data) => setVenta(data))
      .catch((error) => console.error('Error al obtener las ventas:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateventa/${selectedVenta.idventa}`, {
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
          loadVenta(); // Cargar la lista de docentes actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un docente
  const handleDelete = (idventa) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar esta venta?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el docente
      fetch(`http://localhost:5000/crud/deleteventa/${idventa}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de docentes
            loadVenta();
          }
        })
        .catch((error) => console.error('Error al eliminar la venta:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los docentes
  useEffect(() => {
    fetch('http://localhost:5000/crud/readventa')
      .then((response) => response.json())
      .then((data) => setVenta(data))
      .catch((error) => console.error('Error al obtener las ventas:', error));
  }, []);

  return (
    <div>
      <Header rol={rol}/>

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Lista de Ventas</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Tipo de venta</th>
              </tr>
            </thead>
            <tbody>
              {Venta.map((venta) => (
                <tr key={venta.idventa}>
                  <td>{venta.idventa}</td>
                  <td>{formatDateForInput(venta.fecha)}</td>
                  <td>{venta.tipo_de_venta}</td>
                  <td className='center-button'>
                    <Button variant="primary" className='margin-button' onClick={() => openModal(venta)}><FaPencil /></Button>
                    <Button variant="danger" className='margin-button' onClick={() => handleDelete(venta.idventa)}><FaTrashCan /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Venta</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="fecha" label="Fecha">
                      <Form.Control
                        type="date"
                        placeholder="Seleccion la fecha de la venta"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="tipo_de_venta" label="Tipo de Venta">
                      <Form.Select 
                        aria-label="Tipo de venta"
                        name="tipo_de_venta"
                        value={formData.tipo_de_venta}
                        onChange={handleFormChange}
                      >
                        <option>Seleccione el tipo de venta</option>
                        <option value="Linea">Linea</option>
                        <option value="Presencial">Presencial</option>
                      </Form.Select>
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

export default VentaList;