import React , { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col, Form, Modal, FloatingLabel, Table } from 'react-bootstrap';
import { FaSearch, FaPlus, FaTrashAlt } from 'react-icons/fa';
import Header from '../components/Header';
import '../styles/App.css';

function Venta({rol}) {

  const [formData, setFormData] = useState({
    DNI: '',
    idempleado: '',
  });

  // Crear un estado para cada campo del formulario
  const [fecha, setFecha] = useState('');
  const [tipo_de_venta, setTipo_de_venta] = useState('');

  const [cantidad, setCantidad] = useState('');

  const [empleado, setEmpleado] = useState([]);
  const [Cliente, setCliente] = useState([]);
  const [producto, setProducto] = useState([]);

  const [detalleventa, setdetalleventa] = useState([]);

  const [showClienteModal, setShowClienteModal] = useState(false);
  const [showEmpleadoModal, setShowEmpleadoModal] = useState(false);
  const [showProductoModal, setShowProductoModal] = useState(false);

  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [selectedProducto, setSelectedProducto] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const AgregarDetalleProducto = () => {
    if (selectedProducto && cantidad) {
      const nuevoDetalle = {
        idproducto: selectedProducto.idproducto,
        nombre: selectedProducto.nombre,
        precio: selectedProducto.precio,
        tipo_de_venta: tipo_de_venta,
        cantidad: cantidad
      };
      setdetalleventa([...detalleventa, nuevoDetalle]);
      setCantidad('');
      setSelectedProducto('');
    } else {
      alert('Asegúrese de selecionar un producto o ingresar una cantidad.');
    }
  };

  const Eliminardetalle = (idproducto) => {
    const detallesActualizados = detalleventa.filter(detalle => detalle.idproducto !== idproducto);
    setdetalleventa(detallesActualizados);
  };
  
  const filteredCliente = Cliente.filter((Cliente) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const DNI = Cliente.DNI;
    const nombre = Cliente.nombre.toLowerCase(); 
    const search = searchQuery.toLowerCase();

    // Verifica si la cadena de búsqueda se encuentra en algún campo
    return (
      DNI === (search) ||
      nombre.includes(search)
    );
  });

   //Manejo de carga y selección de Clientes --------------------------------------
   const loadDNI = () => {
    fetch('http://localhost:5000/crud/readcliente')
      .then((response) => response.json())
      .then((data) => setCliente(data))
      .catch((error) => console.error('Error al obtener los clientes:', error));
  };

   //Control de apertura de modal de Clientes
   const openClienteModal = () => {
    setShowClienteModal(true);
  };

  //Control de clierre de modal de Clientes
  const closeClienteModal = () => {
    setShowClienteModal(false);
    setSearchQuery('');
  };

  //Actualización de valor de variable de estado de Cliente selecionado
  const selectCliente = (Cliente) => {
    setSelectedCliente(Cliente);
    setFormData({
      formData,
      DNI: Cliente.DNI,
    });
    closeClienteModal();
  };

  //Manejo de carga y selección de Empleados --------------------------------------
  const loadEmpleado = () => {
    fetch('http://localhost:5000/crud/readempleado')
      .then((response) => response.json())
      .then((data) => setEmpleado(data))
      .catch((error) => console.error('Error al obtener los empleados:', error));
  };

  //Control de apertura de modal de Empleados
  const openEmpleadoModal = () => {
    setShowEmpleadoModal(true);
  };

  //Control de clierre de modal de Empleados
  const closeEmpleadoModal = () => {
    setShowEmpleadoModal(false);
  };

  //Actualización de valor de variable de estado de Empleado selecionado
  const selectEmpleado = (empleado) => {
    setSelectedEmpleado(empleado);
    setFormData({
      ...formData,
      idempleado: empleado.idempleado,
    });
    closeEmpleadoModal();
  };

  //Manejo de carga y selección de Productos --------------------------------------
  const loadProducto = () => {
    fetch('http://localhost:5000/crud/readproducto')
      .then((response) => response.json())
      .then((data) => setProducto(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  };

  //Control de apertura de modal de Empleados
  const openProductoModal = () => {
    setShowProductoModal(true);
  };

  //Control de clierre de modal de Empleados
  const closeProductoModal = () => {
    setShowProductoModal(false);
  };

  //Actualización de valor de variable de estado de Empleado selecionado
  const selectProducto = (producto) => {
    setSelectedProducto(producto);
    setFormData({
      ...formData,
      idproducto: producto.idproducto,
    });
    closeProductoModal();
  };

  //Carga de datos de Clientes, Empleados y Productos
  useEffect(() => {
    loadDNI();
    loadEmpleado();
    loadProducto();
  }, []);


  const registrarventa = () => {
    if (fecha && selectedCliente && selectedEmpleado && detalleventa.length > 0) {
      const data = {
        fecha: fecha,
        tipo_de_venta: tipo_de_venta,
        DNI: selectedCliente.DNI,
        idempleado: selectedEmpleado.idempleado,
        detalle: detalleventa,
      };

      fetch('http://localhost:5000/crud/createventa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            // Aquí puedes mostrar un mensaje de éxito o reiniciar los estados
            console.log('Venta registrada con éxito');
            alert('¡Venta registrada con éxito!');
            setFecha('');
            setdetalleventa([]);
            // Limpia otros estados según sea necesario
          } else {
            // Aquí maneja el caso de error en la petición
            console.error('Error al registrar la venta');
          }
        })
        .catch((error) => {
          // Aquí maneja los errores de red u otros
          console.error('Error en la solicitud:', error);
        });
    } else {
      alert('Asegúrese de completar la información necesaria para registrar la venta.');
    }
  };

  

  return(
    <div>
      <Header rol={rol} />
      
      <Container className="margen-contenedor">
        <Card className="global-margin-top">
          <Card.Body>
            <Card.Title className="mt-3 title">Registro de Venta</Card.Title>
            <Form className="mt-3" >
              <Row className="g-3">

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="fecha" label="Fecha de venta">
                    <Form.Control 
                      type="date" 
                      placeholder="Seleccione dela venta"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>
 
                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="tipo_de_venta" label="Tipo de venta">
                    <Form.Select 
                      aria-label="Tipo de venta"
                      value={tipo_de_venta}
                      onChange={(e) => setTipo_de_venta(e.target.value)}
                    >
                      <option>Seleccione el tipo de venta</option>
                      <option value="Linea">Linea</option>
                      <option value="Presencial">Presencial</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="4" lg="4">
                  <FloatingLabel controlId="cliente" label="Cliente">
                    <Form.Control
                      type="text"
                      placeholder="Seleccionar Cliente"
                      name="cliente"
                      value={selectedCliente ? selectedCliente.nombre : ''}
                      readOnly
                    />
                    <div className="button-container">
                      <Button className="search-button" variant="outline-primary" onClick={openClienteModal}>
                        <FaSearch />
                      </Button>
                    </div>
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="4" lg="4">
                  <FloatingLabel controlId="empleado" label="Empleado">
                    <Form.Control
                      type="text"
                      placeholder="Seleccionar Empleado"
                      name="empleado"
                      value={selectedEmpleado ? selectedEmpleado.nombre : ''}
                      readOnly
                    />
                    <div className="button-container">
                      <Button className="search-button" variant="outline-primary" onClick={openEmpleadoModal}>
                        <FaSearch />
                      </Button>
                    </div>
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="4" lg="4">
                  <FloatingLabel controlId="producto" label="Producto">
                    <Form.Control
                      type="text"
                      placeholder="Seleccionar Producto"
                      name="producto"
                      value={selectedProducto ? selectedProducto.nombre : ''}
                      readOnly
                    />
                    <div className="button-container">
                      <Button className="search-button" variant="outline-primary" onClick={openProductoModal}>
                        <FaSearch />
                      </Button>
                    </div>
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="2" lg="2" className="">
                  <FloatingLabel controlId="cantidad" label="Cantidad">
                    <Form.Control 
                      type="number" 
                      placeholder="Cantidad de Producto"
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="2" lg="2" className="d-flex align-items-center">
                  <Button onClick={AgregarDetalleProducto} variant="outline-success" size="lg">
                    <FaPlus />
                  </Button>
                </Col>

                <Col sm="12" md="1" lg="12">
                  <Card className="global-margin-top">
                    <Card.Body>
                      <Card.Title className="mt-3 title">Detalle de productos</Card.Title>
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Tipo de Venta</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                        {detalleventa.map((detalle) => (
                          <tr key={detalle.idproducto}>
                            <td>{detalle.idproducto}</td>
                            <td>{detalle.nombre}</td>
                            <td>{detalle.precio}</td>
                            <td>{detalle.tipo_de_venta}</td>
                            <td>{detalle.cantidad}</td>
                            <td>{detalle.cantidad * detalle.precio}</td>
                            <td className="align-button">
                              <Button 
                                size="sm"
                                onClick={() => Eliminardetalle(detalle.idproducto)}
                                variant="danger">

                                <FaTrashAlt />
                              </Button>
                            </td>
                          </tr>
                        ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>

             
                </Row>
              <div className="center-button">
                <Button variant="primary" onClick={registrarventa} className="mt-3" size="lg">
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={showClienteModal} onHide={closeClienteModal} centered scrollable size='md'>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col sm="12" md="12" lg="12">
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
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {filteredCliente.map((cliente) => (
                <tr key={cliente.idcliente} onClick={() => selectCliente(cliente)}>
                  <td>{cliente.nombre}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>

      <Modal show={showEmpleadoModal} onHide={closeEmpleadoModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {empleado.map((empleado) => (
            <div className="Seleccion" key={empleado.idempleado} onClick={() => selectEmpleado(empleado)}>
              {empleado.nombre}
            </div>
          ))}
        </Modal.Body>
      </Modal>

      <Modal show={showProductoModal} onHide={closeProductoModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {producto.map((producto) => (
            <div className="Seleccion" key={producto.idproducto} onClick={() => selectProducto(producto)}>
              {producto.nombre}
            </div>
          ))}
        </Modal.Body>
      </Modal>

    </div>
  );
}


export default Venta;