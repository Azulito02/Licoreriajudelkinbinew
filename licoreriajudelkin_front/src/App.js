import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cliente from './pages/Cliente';
import About from './pages/About';
import Producto from './pages/producto';
import Productolist from './pages/productolist';
import CLienteList from './pages/ClienteList';
import Empleado from './pages/Empleado';
import EmpleadoList from './pages/EmpleadoList';
import Categoria from './pages/Categoria';
import CategoriaList from './pages/CategoriaList';
import Detalleventa from './pages/Detalleventa';
import DetalleventaList from './pages/DetalleventaList';
import Venta from './pages/Venta';
import VentaList from './pages/VentaList';
import Estadisticas from './pages/Estadisticas';
import Dasboard from './pages/Dasboard';
import Galeria from './pages/Galeria';  




function App() {

  const storedRol = localStorage.getItem('userRol');

  //const [userRol, setUserRol] = useState('');
  const [userRol, setUserRol] = useState(storedRol || '');

  // Guardar el rol del usuario en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('userRol', userRol);
  }, [userRol]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login rol={userRol} setRol={setUserRol} />} />
        <Route path="/home" element={userRol ? <Home rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/about" element={userRol ? <About rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path= "/cliente" element={userRol ? <Cliente rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/producto" element={userRol ? <Producto rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path= "/productolist" element={userRol ? <Productolist rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path= "/ClienteList" element={userRol ? <CLienteList rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path= "/Empleado" element={userRol ? <Empleado rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path= "/EmpleadoList" element={userRol ? <EmpleadoList rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path= "/Categoria" element={userRol ? <Categoria rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path= "/CategoriaList" element={userRol ? <CategoriaList rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path= "/Detalleventa" element={userRol ? <Detalleventa rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path= "/DetalleventaList" element={userRol ? <DetalleventaList rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/Venta" element={userRol ? <Venta rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path= "/VentaList" element={userRol ? <VentaList rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/estadisticas" element={userRol ? <Estadisticas rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/Dasboard" element={userRol ? <Dasboard rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/galeria" element={userRol ? <Galeria rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/SinAcceso" element={<sinAcceso />} />
      </Routes>
    </Router>

    
  );

  
}

export default App;

