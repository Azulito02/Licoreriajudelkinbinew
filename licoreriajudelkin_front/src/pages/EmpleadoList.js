import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaPencil, FaTrashCan } from 'react-icons/fa6';

function EmpleadoList({rol}) {
  const [Empleados, setEmpleados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: '',
    correo: '',
  });

  // Función para abrir el modal y pasar los datos del empleado seleccionado
  const openModal = (empleado) => {
    setSelectedEmpleado(empleado);

    setFormData({
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      telefono: empleado.telefono,
      direccion: empleado.direccion,
      correo: empleado.correo,
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

  const loadEmpleado = () => {
    fetch('http://localhost:5000/crud/readempleado')
      .then((response) => response.json())
      .then((data) => setEmpleados(data))
      .catch((error) => console.error('Error al obtener empleado:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateempleado/${selectedEmpleado.idempleado}`, {
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
          loadEmpleado(); // Cargar la lista de docentes actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un docente
  const handleDelete = (idempleado) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este empleado?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el docente
      fetch(`http://localhost:5000/crud/deleteempleado/${idempleado}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de docentes
            loadEmpleado();
          }
        })
        .catch((error) => console.error('Error al eliminar el empleado:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los docentes
  useEffect(() => {
    fetch('http://localhost:5000/crud/readempleado')
      .then((response) => response.json())
      .then((data) => setEmpleados(data))
      .catch((error) => console.error('Error al obtener los empleados:', error));
  }, []);

  return (
    <div>
      <Header rol={rol}/>
      <Container>
      <Card className="margen-contenedor">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Empleados</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Telefono</th>
                <th>Direccion</th>
                <th>Correo</th>
              </tr>
            </thead>
            <tbody>
              {Empleados.map((Empleado) => (
                <tr key={Empleado.idempleado}>
                  <td>{Empleado.idempleado}</td>
                  <td>{Empleado.nombre}</td>
                  <td>{Empleado.apellido}</td>
                  <td>{Empleado.telefono}</td>
                  <td>{Empleado.direccion}</td>
                  <td>{Empleado.correo}</td>
                  <td>
                    <Button variant="primary" className='margin-button' onClick={() => openModal(Empleado)}><FaPencil /></Button>
                    <Button variant="danger" className='margin-button' onClick={() => handleDelete(Empleado.idempleado)}><FaTrashCan /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>actualización de Empleados</Card.Title>
                    <Form className="mt-3">
                        <Row className="g-3">

                            <Col sm="6" md="6" lg="6">
                                <FloatingLabel controlId="nombre" label="Nombre">
                                    <Form.Control
                                    type="text"
                                    placeholder="Ingrese el nombre del producto"
                                    value={formData.nombre}
                                    name="nombre"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="6" md="6" lg="6">
                                <FloatingLabel controlId="apellido" label="Apellido">
                                    <Form.Control
                                    type="text"
                                    placeholder="Ingrese el apellido"
                                    value={formData.apellido}
                                    name="apellido"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="12" md="6" lg="6">
                                <FloatingLabel controlId="telefono" label="Telefono">
                                    <Form.Control 
                                    type="number" 
                                    placeholder="Ingrese el numero"
                                    value={formData.telefono}
                                    name="telefono"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="12" md="12" lg="6">
                                <FloatingLabel controlId="direccion" label="Direccion">
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Ingrese la direccion" 
                                    value={formData.direccion}
                                    name="direccion"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="12" md="6" lg="12">
                                <FloatingLabel controlId="correo" label="Correo">
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Ingrese el correo"
                                    value={formData.correo}
                                    name="correo"
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

export default EmpleadoList;