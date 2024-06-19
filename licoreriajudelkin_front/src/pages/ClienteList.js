import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaPencil, FaTrashCan } from 'react-icons/fa6';

function CLienteList({rol}) {
  const [Clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    correo: '',
    telefono: '',
  });

   // Crear busqueda

   const [searchQuery, setSearchQuery] = useState('');

   const handleSearchChange = (e) => {
     setSearchQuery(e.target.value);
   };

   const filteredClientes = Clientes.filter((cliente) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const idclientes = cliente.idclientes;
    const nombre = cliente.nombre?.toLowerCase(); 
    const apellido = cliente.apellido?.toLowerCase();
    const direccion = cliente.direccion?.toLowerCase();
    const correo = cliente.correo?.toLowerCase();
    const telefono = cliente.telefono?.toLowerCase();
    const search = searchQuery.toLowerCase();
  
    // Verifica si la cadena de búsqueda se encuentra en algún campo
    return (
      idclientes === search ||
      nombre?.includes(search) ||
      apellido?.includes(search) ||
      direccion?.includes(search) ||
      correo?.includes(search) ||
      telefono === search
    );
  });
  

  
 
  // Función para abrir el modal y pasar los datos del docente seleccionado
  const openModal = (cliente) => {
    setSelectedCliente(cliente);

    setFormData({
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      direccion: cliente.direccion,
      correo: cliente.correo,
      telefono: cliente.telefono,
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

  const loadCliente = () => {
    fetch('http://localhost:5000/crud/readcliente')
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error('Error al obtener clientes:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updatecliente/${selectedCliente.DNI}`, {
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
          loadCliente(); // Cargar la lista de docentes actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un docente
  const handleDelete = (DNI) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este cliente?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el docente
      fetch(`http://localhost:5000/crud/deletecliente/${DNI}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de docentes
            loadCliente();
          }
        })
        .catch((error) => console.error('Error al eliminar el cliente:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los docentes
  useEffect(() => {
    fetch('http://localhost:5000/crud/readcliente')
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error('Error al obtener los clientes:', error));
  }, []);

  return (
    <div>
      <Header rol={rol}/>
      <Container>
      <Card className="margen-contenedor">
        <Card.Body>
          <Card.Title className="mb-3">Listado de clientes</Card.Title>
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
                <th>Apellidos</th>
                <th>Direccion</th>
                <th>Correo</th>
                <th>telefono</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map((cliente) => (
                <tr key={cliente.DNI}>
                  <td>{cliente.DNI}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.apellido}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.correo}</td>
                  <td>{cliente.telefono}</td>
                  <td>
                    <Button variant="primary" className='margin-button' onClick={() => openModal(cliente)}><FaPencil /></Button>
                    <Button variant="danger" className='margin-button' onClick={() => handleDelete(cliente.DNI)}><FaTrashCan /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>actualización de Clientes</Card.Title>
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

                            <Col sm="12" md="12" lg="6">
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

                            <Col sm="12" md="6" lg="12">
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

export default CLienteList;