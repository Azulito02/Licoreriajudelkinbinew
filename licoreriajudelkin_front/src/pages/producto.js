import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Producto({ rol }) {
  // Crear un estado para cada campo del formulario
  const [nombre, setNombre] = useState('');
  const [existencia, setExistencia] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [porcentaje_alcohol, setPorcentaje_alcohol] = useState('');
  const [categorias, setcategorias] = useState([]);
  const [idcategoria, setidcategoria] = useState('');
  const [imagen, setImagen] = useState('');

  const handleImagenChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      setImagen(base64String);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      nombre,
      existencia,
      precio,
      descripcion,
      porcentaje_alcohol,
      idcategoria,
      imagen
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createproducto', {
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
        setExistencia('');
        setPrecio('');
        setDescripcion('');
        setPorcentaje_alcohol('');
        setidcategoria('');
        setImagen('');
      } else {
        alert('Asegurese de ingresar todos los datos del producto');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener las categorías
    fetch('http://localhost:5000/crud/readcategoria')
      .then((response) => response.json())
      .then((data) => {
        // Verifica si la respuesta es un array antes de actualizar el estado
        if (Array.isArray(data)) {
          setcategorias(data);
        } else {
          console.error('La respuesta de la API no es un array:', data);
        }
      })
      .catch((error) => {
        console.error('Error al obtener las categorías.', error);
      });
  }, []);

  const handleNombreProductoChange = (e) => {
    // Validar que solo se ingresen letras
    const nuevoNombre = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo permite letras y espacios
    setNombre(nuevoNombre);
  };

  return (
    <div>
      <Header rol={rol} />

      <Container>
        <Card className="margen-contenedor">
          <Card.Body>
            <Card.Title>Registro de Productos</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre del producto"
                      value={nombre}
                      onChange={handleNombreProductoChange}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="existencia" label="Existencia">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese la existencia"
                      value={existencia}
                      onChange={(e) => setExistencia(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="precio" label="Precio">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese el precio"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="12" lg="6">
                  <FloatingLabel controlId="porcentaje_alcohol" label="Porcentaje de alcohol">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese el porcentaje de alcohol"
                      value={porcentaje_alcohol}
                      onChange={(e) => setPorcentaje_alcohol(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="12">
                  <FloatingLabel controlId="descripcion" label="Descripción">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la descripción"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="categoria" label="Categorías">
                    <Form.Select
                      aria-label="Categorías"
                      value={idcategoria}
                      onChange={(e) => setidcategoria(e.target.value)}
                    >
                      <option>Seleccione la categoría</option>
                      {Array.isArray(categorias) &&
                        categorias.map((categoria) => (
                          <option key={categoria.idcategoria} value={categoria.idcategoria}>
                            {categoria.nombre_categoria}
                          </option>
                        ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <Form.Group controlId="imagen" className="">
                    <Form.Control
                      type="file"
                      accept=".jpg, .png, .jpeg"
                      size="lg"
                      onChange={handleImagenChange}
                    />
                  </Form.Group>
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

export default Producto;
