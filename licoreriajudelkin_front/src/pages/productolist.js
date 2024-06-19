import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel, Container } from 'react-bootstrap';
import Header from '../components/Header';
import { FaPencil, FaTrashCan } from 'react-icons/fa6';

function Productolist({ rol }) {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    existencia: '',
    precio: '',
    descripcion: '',
    porcentaje_alcohol: '',
    idcategoria: '',
    imagen: ''
  });

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener las categorías
    fetch('http://localhost:5000/crud/readcategoria')
      .then(response => response.json())
      .then(data => {
        // Actualiza el estado con las categorías obtenidas
        console.log('Categorías obtenidas:', data);
        setCategorias(data);
      })
      .catch(error => {
        console.error('Error al obtener las categorías:', error);
      });
  }, []);

  const handleImagenChange = (event) => {
    const file = event.target.files[0]; // Obtener el primer archivo seleccionado

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result; // Obtener la imagen en formato base64
      setFormData({
        ...formData,
        imagen: base64String
      });
    };
    if (file) {
      reader.readAsDataURL(file); // Lee el contenido del archivo como base64
    }
  };

  // Crear búsqueda
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProductos = productos.filter((producto) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const idproducto = producto.idproducto;
    const nombre = producto.nombre.toLowerCase();
    const existencia = producto.existencia;
    const precio = producto.precio;
    const descripcion = producto.descripcion.toLowerCase();
    const porcentaje_alcohol = producto.porcentaje_alcohol;
    const idcategoria = producto.idcategoria;
    const search = searchQuery.toLowerCase();

    // Verifica si la cadena de búsqueda se encuentra en algún campo
    return (
      idproducto === (search) ||
      nombre.includes(search) ||
      existencia === (search) ||
      precio === (search) ||
      descripcion.includes(search) ||
      porcentaje_alcohol === (search) ||
      idcategoria === (search)
    );
  });

  // Función para abrir el modal y pasar los datos del producto seleccionado
  const openModal = (producto) => {
    setSelectedProducto(producto);

    setFormData({
      nombre: producto.nombre,
      existencia: producto.existencia,
      precio: producto.precio,
      descripcion: producto.descripcion,
      porcentaje_alcohol: producto.porcentaje_alcohol,
      idcategoria: producto.idcategoria,
      imagen: producto.imagen
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

  const loadProducto = () => {
    fetch('http://localhost:5000/crud/readproducto')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener productos:', error));
  };

  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateproducto/${selectedProducto.idproducto}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de productos
          setShowModal(false);
          loadProducto(); // Cargar la lista de productos actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un producto
  const handleDelete = (idproducto) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este producto?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el producto
      fetch(`http://localhost:5000/crud/deleteproducto/${idproducto}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de productos
            loadProducto();
          }
        })
        .catch((error) => console.error('Error al eliminar el producto:', error));
    }
  };

  const handleCategoriaChange = (e) => {
    setFormData({
      ...formData,
      idcategoria: e.target.value
    });
  };

  // Realiza una solicitud GET al servidor para obtener los productos
  useEffect(() => {
    fetch('http://localhost:5000/crud/readproducto')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  return (
    <div>
      <Header rol={rol} />

      <Container>
        <Card className="margen-contenedor">
          <Card.Body>
            <Card.Title className="mb-3">Listado de Productos</Card.Title>
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
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombres</th>
                  <th>Existencia</th>
                  <th>Precio</th>
                  <th>Descripción</th>
                  <th>Porcentaje de alcohol</th>
                  <th>ID Categoría</th>
                  <th>Imagen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProductos.map((producto) => (
                  <tr key={producto.idproducto}>
                    <td>{producto.idproducto}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.existencia}</td>
                    <td>C$ {producto.precio}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.porcentaje_alcohol}</td>
                    <td>{producto.idcategoria}</td>
                    <td>
                      {/* Muestra la imagen en base64 */}
                      <img src={producto.imagen} alt={producto.nombre} style={{ width: '50px' }} />
                    </td>
                    <td>
                      <Button variant="primary" className='margin-button' onClick={() => openModal(producto)}><FaPencil /></Button>
                      <Button variant="danger" className='margin-button' onClick={() => handleDelete(producto.idproducto)}><FaTrashCan /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Productos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Actualización de Productos</Card.Title>
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
                    <FloatingLabel controlId="existencia" label="Existencia">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese la existencia"
                        value={formData.existencia}
                        name="existencia"
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="6">
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
                  <Col sm="12" md="12" lg="6">
                    <FloatingLabel controlId="porcentaje_alcohol" label="Porcentaje de alcohol">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el porcentaje de alcohol"
                        value={formData.porcentaje_alcohol}
                        name="porcentaje_alcohol"
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="descripcion" label="Descripción">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la descripción"
                        value={formData.descripcion}
                        name="descripcion"
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="categoria" label="Categorías">
                      <Form.Select
                        aria-label="Categorías"
                        value={formData.idcategoria}
                        onChange={handleCategoriaChange}
                      >
                        <option>Seleccione la categoría</option>
                        {Array.isArray(categorias) && categorias.map((categoria) => (
                          <option key={categoria.idcategoria} value={categoria.idcategoria}>
                            {categoria.nombre_categoria}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="12" lg="12">
                    <Form.Group controlId="imagen" className="">
                      <Form.Control
                        type="file"
                        accept=".jpg, .png, .jpeg"
                        size="lg"
                        name="imagen"
                        onChange={handleImagenChange}
                      />
                    </Form.Group>
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

export default Productolist;
