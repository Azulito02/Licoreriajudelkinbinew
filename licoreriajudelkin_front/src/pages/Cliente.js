import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Cliente({rol}) {

  // Crear un estado para cada campo del formulario
  const [nombre, setnombre] = useState('');
  const [apellido, setapellido] = useState('');
  const [direccion, setdireccion] = useState('');
  const [correo, setcorreo] = useState('');
  const [telefono, settelefono] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      nombre,
      apellido,
      direccion,
      correo,
      telefono,
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createcliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // El registro se creó exitosamente
        alert('Registro exitoso');
        // Reiniciar los campos del formulario
        setnombre('');
        setapellido('');
        setdireccion('');
        setcorreo('');
        settelefono('');
      } else {
        alert('Asegurese de ingresar todos los datos de cliente');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };


   const handleNombreClinteChange = (e) => {
    // Validar que solo se ingresen letras
    const nuevoNombre = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo permite letras y espacios
    setnombre(nuevoNombre);
  };

  const handleApellidoClinteChange = (e) => {
    // Validar que solo se ingresen letras
    const nuevoapellido = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo permite letras y espacios
    setapellido(nuevoapellido);
  };


  return(
    <div>
      <Header rol={rol}/>
      
      <Container>
        <Card className="margen-contenedor">
          <Card.Body>
            <Card.Title>Registro de Cliente</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      value={nombre}
                      onChange={handleNombreClinteChange}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="apellido" label="apellido">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el apellido"
                      value={apellido}
                      onChange={handleApellidoClinteChange}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="direccion" label="direccion">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese direccion"
                      value={direccion}
                      onChange={(e) => setdireccion(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="correo" label="correo">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese el correo"
                      value={correo}
                      onChange={(e) => setcorreo(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="12" lg="12">
                  <FloatingLabel controlId="telefono" label="telefono">
                    <Form.Control 
                      type="number" 
                      placeholder="Ingrese su telefono" 
                      value={telefono}
                      onChange={(e) => settelefono(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" size="lg">
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

    </div>
  );
}


export default Cliente;