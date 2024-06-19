import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Empleado({rol}) {

   // Crear un estado para cada campo del formulario
   const [nombre, setNombre] = useState('');
   const [apellido, setApellido] = useState('');
   const [telefono, setTelefono] = useState('');
   const [direccion, setDireccion] = useState('');
   const [correo, setCorreo] = useState('');
 
   // Función para manejar el envío del formulario
   const handleSubmit = async (e) => {
     e.preventDefault();
 
     // Crear un objeto con los datos del formulario
     const formData = {
       nombre,
       apellido,
       telefono,
       direccion,
       correo,
     };
 
     try {
       // Realizar una solicitud HTTP al backend para enviar los datos
       const response = await fetch('http://localhost:5000/crud/createempleado', {
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
         setNombre('');
         setApellido('');
         setTelefono('');
         setDireccion('');
         setCorreo('');
       } else {
         alert('Error al registrar el empleado');
       }
     } catch (error) {
       console.error('Error en la solicitud:', error);
       alert('Error en la solicitud al servidor');
     }
   };

   const handleNombreEmpleadoChange = (e) => {
    // Validar que solo se ingresen letras
    const nuevoNombre = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo permite letras y espacios
    setNombre(nuevoNombre);
  };

  const handleApellidoEmpleadoChange = (e) => {
    // Validar que solo se ingresen letras
    const nuevoapellido = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo permite letras y espacios
    setApellido(nuevoapellido);
  };

 
   return(
     <div>
       <Header rol={rol}/>
       
       <Container>
         <Card className="margen-contenedor">
           <Card.Body>
             <Card.Title>Registrar de Empleado</Card.Title>
             <Form className="mt-3" onSubmit={handleSubmit}>
               <Row className="g-3">
 
                 <Col sm="6" md="6" lg="6">
                   <FloatingLabel controlId="nombre" label="Nombre">
                     <Form.Control
                       type="text"
                       placeholder="Ingrese el nombre"
                       value={nombre}
                       onChange={handleNombreEmpleadoChange}
                     />
                   </FloatingLabel>
                 </Col>
 
                 <Col sm="6" md="6" lg="6">
                   <FloatingLabel controlId="apellido" label="apellido">
                     <Form.Control
                       type="text"
                       placeholder="Ingrese el apellido"
                       value={apellido}
                       onChange={handleApellidoEmpleadoChange}
                     />
                   </FloatingLabel>
                 </Col>
 
                 <Col sm="12" md="6" lg="6">
                   <FloatingLabel controlId="telefono" label="Telefono">
                     <Form.Control 
                       type="number" 
                       placeholder="Ingrese numero de telefono"
                       value={telefono}
                       onChange={(e) => setTelefono(e.target.value)} 
                     />
                   </FloatingLabel>
                 </Col>
 
                 <Col sm="12" md="6" lg="6">
                   <FloatingLabel controlId="direccion" label="direccion">
                     <Form.Control 
                       type="text" 
                       placeholder="Ingrese la direccion"
                       value={direccion}
                       onChange={(e) => setDireccion(e.target.value)} 
                     />
                   </FloatingLabel>
                 </Col>
 
                 <Col sm="12" md="12" lg="12">
                   <FloatingLabel controlId="correo" label="correo">
                     <Form.Control 
                       type="text" 
                       placeholder="Ingrese su correo" 
                       value={correo}
                       onChange={(e) => setCorreo(e.target.value)}
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
 
 export default Empleado;