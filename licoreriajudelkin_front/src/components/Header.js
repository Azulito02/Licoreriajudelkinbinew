import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Offcanvas, Button, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaRightFromBracket } from 'react-icons/fa6';


function Header({ rol }) {
  
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

   // Función para cerrar sesión
   const cerrarSesion = () => {
    // Eliminar el rol del localStorage al cerrar sesión
    localStorage.removeItem('userRol');
  };

  return (

    <div>
    {rol === 'admin' && (  
    <div>
      {/* Navbar principal */}
      <Navbar className="navbar-color" variant="dark" expand="md" fixed='top'>
        <Container>
          <Navbar.Brand href="#home">Licoreria Judelkin</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ display: 'none' }}
            className="d-sm-none d-xs-none"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">

              <Nav.Link>
                <Link to="/" className="link-unstyled">Inicio</Link>
              </Nav.Link>

              <NavDropdown title="Empleados" id="Empleado">
                <NavDropdown.Item>
                  <Link to="/Empleado" className="link-unstyled">Registrar Empleado</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/EmpleadoList" className="link-unstyled">Listar Empleados</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Clientes" id="clientes">
                <NavDropdown.Item>
                  <Link to="/cliente" className="link-unstyled">Registrar Cliente</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/ClienteList" className="link-unstyled">Listar Clientes</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Productos" id="productos">
                <NavDropdown.Item>
                  <Link to="/producto" className="link-unstyled">Registrar Productos</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/productolist" className="link-unstyled">Listar Productos</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link>
                    <Link to="/galeria" className="link-unstyled">Galeria</Link>
                  </Nav.Link>

                  <Nav.Link>
                    <Link to="/estadisticas" className="link-unstyled">Estadisticas</Link>
                  </Nav.Link>
                
                  <Nav.Link>
                    <Link to="/Dasboard" className="link-unstyled">Dasboard</Link>
                  </Nav.Link>

              <NavDropdown title="Ventas" id="Venta">
                <NavDropdown.Item>
                  <Link to="/Venta" className="link-unstyled">Registro de Venta</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/VentaList" className="link-unstyled">Listar Ventas</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Detalle de venta" id="Detalleventa">
                <NavDropdown.Item>
                  <Link to="/Detalleventa" className="link-unstyled">Registrar Detalle de venta</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/DetalleventaList" className="link-unstyled">Listar Detalle de venta</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Categoria" id="Categoria">
                <NavDropdown.Item>
                  <Link to="/Categoria" className="link-unstyled">Registro de categoria</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/CategoriaList" className="link-unstyled">Lista de categoria</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link>
                <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /></Link>
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>
          <Button
            variant="outline-light"
            onClick={toggleMenu}
            className="d-md-none d-block"
            aria-controls="basic-navbar-nav"
            aria-expanded={showMenu ? 'true' : 'false'}
          >
            Menú
          </Button>
        </Container>
      </Navbar>

      {/* Menú lateral (Offcanvas) */}
      <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">

            <Nav.Link>
              <Link to="/" className="link-unstyled">Inicio</Link>
            </Nav.Link>

            <Nav.Link>
              <Link to="/about" className="link-unstyled">About</Link>
            </Nav.Link>

            <NavDropdown title="Clientes" id="clientes">
              <NavDropdown.Item>
                <Link to="/cliente" className="link-unstyled">Registrar Cliente</Link>
              </NavDropdown.Item>
              
              <NavDropdown.Item>
                <Link to="/actualizar-cliente" className="link-unstyled">Listar Clientes</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Productos" id="productos">
              <NavDropdown.Item>
                <Link to="/productos" className="link-unstyled">Registrar Productos</Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link to="/actualizar-productos" className="link-unstyled">Listar Productos</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Empleados" id="Empleado">
                <NavDropdown.Item>
                  <Link to="/Empleado" className="link-unstyled">Registrar Empleado</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/EmpleadoList" className="link-unstyled">Listar Empleados</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Clientes" id="clientes">
                <NavDropdown.Item>
                  <Link to="/cliente" className="link-unstyled">Registrar Cliente</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/ClienteList" className="link-unstyled">Listar Clientes</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Productos" id="productos">
                <NavDropdown.Item>
                  <Link to="/producto" className="link-unstyled">Registrar Productos</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/productolist" className="link-unstyled">Listar Productos</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link>
                    <Link to="/galeria" className="link-unstyled">Galeria</Link>
                  </Nav.Link>

                  <Nav.Link>
                    <Link to="/estadisticas" className="link-unstyled">Estadisticas</Link>
                  </Nav.Link>


             <NavDropdown title="Dashboard" id="Dasboard">
              <NavDropdown.Item>
                <Link to="/Dasboard" className="link-unstyled">Dasboard</Link>
              </NavDropdown.Item>
            </NavDropdown>  
                  

              <NavDropdown title="Ventas" id="Venta">
                <NavDropdown.Item>
                  <Link to="/Venta" className="link-unstyled">Registro de Venta</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/VentaList" className="link-unstyled">Listar Ventas</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Detalle de venta" id="Detalleventa">
                <NavDropdown.Item>
                  <Link to="/Detalleventa" className="link-unstyled">Registrar Detalle de venta</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/DetalleventaList" className="link-unstyled">Listar Detalle de venta</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Categoria" id="Categoria">
                <NavDropdown.Item>
                  <Link to="/Categoria" className="link-unstyled">Registro de categoria</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/CategoriaList" className="link-unstyled">Lista de categoria</Link>
                </NavDropdown.Item>
              </NavDropdown>

            

          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>)}

    {rol === 'ventas' && ( 

          <div>
          {/* Navbar principal */}
          <Navbar className="navbar-color" variant="dark" expand="md">
            <Container>
              <Navbar.Brand href="#home">Licoreria Judelkin</Navbar.Brand>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                style={{ display: 'none' }}
                className="d-sm-none d-xs-none"
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">

                  <Nav.Link>
                    <Link to="/" className="link-unstyled">Inicio</Link>
                  </Nav.Link>


                  <NavDropdown title="Productos" id="productos">
                    <NavDropdown.Item>
                      <Link to="/producto" className="link-unstyled">Registrar Productos</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/productolist" className="link-unstyled">Listar Productos</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Ventas" id="Venta">
                    <NavDropdown.Item>
                      <Link to="/Venta" className="link-unstyled">Registro de Venta</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/VentaList" className="link-unstyled">Listar Ventas</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Detalle de venta" id="Detalleventa">
                    <NavDropdown.Item>
                      <Link to="/Detalleventa" className="link-unstyled">Registrar Detalle de venta</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/DetalleventaList" className="link-unstyled">Listar Detalle de venta</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Categoria" id="Categoria">
                    <NavDropdown.Item>
                      <Link to="/Categoria" className="link-unstyled">Registro de categoria</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/CategoriaList" className="link-unstyled">Lista de categoria</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link>
                <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /></Link>
                </Nav.Link>

                </Nav>
              </Navbar.Collapse>
              <Button
                variant="outline-light"
                onClick={toggleMenu}
                className="d-md-none d-block"
                aria-controls="basic-navbar-nav"
                aria-expanded={showMenu ? 'true' : 'false'}
              >
                Menú
              </Button>
            </Container>
          </Navbar>

          {/* Menú lateral (Offcanvas) */}
          <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menú</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">

                <Nav.Link>
                  <Link to="/" className="link-unstyled">Inicio</Link>
                </Nav.Link>

                <Nav.Link>
                  <Link to="/about" className="link-unstyled">About</Link>
                </Nav.Link>

                <NavDropdown title="Productos" id="productos">
                  <NavDropdown.Item>
                    <Link to="/productos" className="link-unstyled">Registrar Productos</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/actualizar-productos" className="link-unstyled">Listar Productos</Link>
                  </NavDropdown.Item>
                </NavDropdown>

              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
          </div>
              
              )}
            </div>

   
  );
}

export default Header;