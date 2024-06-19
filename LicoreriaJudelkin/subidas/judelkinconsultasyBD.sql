create database control;
use control;

CREATE TABLE D_cliente (
  DNI int  primary key,
  nombre varchar(50),
  apellido varchar(80),
  direccion varchar(255),
  correo varchar(255),
  telefono varchar(8)
);


CREATE TABLE D_empleado (
  idempleado int  primary key,
  nombre varchar(50),
  apellido varchar(80),
  direccion varchar(255),
  correo varchar(255),
  telefono varchar(8)
);

CREATE TABLE D_producto (
  idproducto int  primary key,
  nombre varchar(30),
  existencia int,
  precio decimal,
  descripcion varchar(30),
  porcentaje_alcohol decimal,
  nombre_categoria varchar(255)
);

CREATE TABLE D_tiempo (
  idtiempo int  primary key,
  fecha date,
  ayo int,
  mes int,
  semana int,
  trimestre int
);

CREATE TABLE H_venta (
	  iddetalleventa int primary key,
	  idventa int , 
      DNI int,
      idempleado int,
      idproducto int,
	  idtiempo int,
	  tipo_de_venta varchar(20),
	  precio decimal,
	  cantidad int,	  
  foreign key (idempleado) references D_empleado (idempleado),
  foreign key (DNI) references D_cliente (DNI),
  foreign key (idproducto) references D_producto (idproducto),
  foreign key (idtiempo) references D_tiempo(idtiempo)
);

-- Ventas totales por año:
SELECT 
    Ayo, 
    SUM(precio * cantidad) AS Ventas_totales
FROM 
    H_venta
JOIN 
    D_Tiempo ON H_venta.idtiempo = D_Tiempo.idtiempo
GROUP BY 
    Ayo;
    
-- Ventas totales por mes de un año específico (por ejemplo, 2024):
SELECT 
    Mes, 
    SUM(precio * cantidad) AS Ventas_totales
FROM 
    H_venta
JOIN 
    D_Tiempo ON H_venta.idtiempo = D_Tiempo.idtiempo
WHERE 
    Ayo = 2024
GROUP BY 
    Mes;    
    
-- Ventas totales por día de un mes y año específicos (por ejemplo, mayo de 2024):
SELECT 
    fecha, 
    SUM(precio * cantidad) AS Ventas_totales
FROM 
    H_venta
JOIN 
    D_Tiempo ON H_venta.idtiempo = D_Tiempo.idtiempo
WHERE 
    Ayo = 2024 AND Mes = 5
GROUP BY 
    fecha;    
    
-- Ventas totales por trimestre:
SELECT 
    trimestre, 
    SUM(precio * cantidad) AS Ventas_totales
FROM 
    H_venta
JOIN 
    D_Tiempo ON H_venta.idtiempo = D_Tiempo.idtiempo
GROUP BY 
    trimestre;    
    
-- Ventas totales por producto:    
SELECT 
    p.idproducto, 
    p.nombre, 
    SUM(hv.cantidad) AS Cantidad_vendida, 
    SUM(hv.precio * hv.cantidad) AS Ventas_totales
FROM 
    H_venta hv
JOIN 
    D_Producto p ON hv.idproducto = p.idproducto
GROUP BY 
    p.idproducto, p.nombre;
    
-- Ventas totales por categoría de producto:
SELECT 
    p.nombre_categoria,
    SUM(hv.precio * hv.cantidad) AS Ventas_Totales
FROM 
    H_venta hv
JOIN 
    D_Producto p ON hv.idproducto = p.idproducto
GROUP BY 
    p.nombre_categoria
ORDER BY 
    Ventas_Totales DESC;    

-- Ventas de productos en stock (productos con stock mayor a 0):
SELECT 
    p.nombre,
    SUM(hv.precio * hv.cantidad) AS Ventas_Totales
FROM 
    H_venta hv
JOIN 
    D_Producto p ON hv.idproducto = p.idproducto
WHERE 
    p.existencia > 0
GROUP BY 
    p.nombre
ORDER BY 
    Ventas_Totales DESC;   

-- Promedio de ventas por producto:    
SELECT 
    p.nombre,
    AVG(hv.precio * hv.cantidad) AS Promedio_Ventas
FROM 
    H_venta hv
JOIN 
    D_Producto p ON hv.idproducto = p.idproducto
GROUP BY 
    p.nombre
ORDER BY 
    Promedio_Ventas DESC;    
    
-- Ventas por producto y por mes:
SELECT 
    p.nombre,
    t.mes,
    t.ayo,
    SUM(hv.precio * hv.cantidad) AS Ventas_Totales
FROM 
    H_venta hv
JOIN 
    D_Producto p ON hv.idproducto = p.idproducto
JOIN 
    D_Tiempo t ON hv.idtiempo = t.idtiempo
GROUP BY 
    p.nombre, t.mes, t.ayo
ORDER BY 
    t.ayo, t.mes, Ventas_Totales DESC;    
    
-- Top 5 productos más vendidos por cantidad:
SELECT 
    p.nombre,
    SUM(hv.precio * hv.cantidad) AS Cantidad_Total_Vendida
FROM 
    H_venta hv
JOIN 
    D_Producto p ON hv.idproducto = p.idproducto
GROUP BY 
    p.nombre
ORDER BY 
    Cantidad_Total_Vendida DESC
LIMIT 5;    

-- Top 5 productos más vendidos por cantidad:
SELECT 
    p.nombre,
    SUM(hv.precio * hv.cantidad) AS Ventas_Totales
FROM 
    H_venta hv
JOIN 
    D_Producto p ON hv.idproducto = p.idproducto
GROUP BY 
    p.nombre
ORDER BY 
    Ventas_Totales DESC
LIMIT 5;

    
-- Total gastado por cada cliente en sus compras --   
SELECT 
  D_cliente.nombre,
  D_cliente.apellido,
  SUM(D_producto.precio * H_venta.cantidad) AS total_gastado
FROM H_venta
JOIN D_cliente ON H_venta.DNI = D_cliente.DNI
JOIN D_producto ON H_venta.idproducto = D_producto.idproducto
GROUP BY D_cliente.DNI;

-- Clientes que compran productos de una categoria especifica --
SELECT DISTINCT 
  D_cliente.nombre,
  D_cliente.apellido,
  D_producto.nombre_categoria
FROM H_venta
JOIN D_cliente ON H_venta.DNI = D_cliente.DNI
JOIN D_producto ON H_venta.idproducto = D_producto.idproducto
WHERE D_producto.nombre_categoria = 'Vodka';

-- Productos mas vendidos --
SELECT 
  D_producto.nombre,
  SUM(H_venta.cantidad) AS total_vendido
FROM H_venta
JOIN D_producto ON H_venta.idproducto = D_producto.idproducto
GROUP BY D_producto.idproducto
ORDER BY total_vendido DESC;

-- Ventas con información completa de cliente, producto y empleado --
SELECT 
  H_venta.idventa,
  D_cliente.nombre AS nombre_cliente,
  D_cliente.apellido AS apellido_cliente,
  D_producto.nombre AS nombre_producto,
  D_empleado.nombre AS nombre_empleado,
  D_empleado.apellido AS apellido_empleado,
  H_venta.cantidad,
  D_tiempo.fecha
FROM H_venta
JOIN D_cliente ON H_venta.DNI = D_cliente.DNI
JOIN D_tiempo ON H_venta.idtiempo = D_tiempo.idtiempo
JOIN D_producto ON H_venta.idproducto = D_producto.idproducto
JOIN D_empleado ON H_venta.idempleado = D_empleado.idempleado;

-- Total de ventas gestionadas por cada empleado --
SELECT 
  D_empleado.nombre,
  D_empleado.apellido,
  COUNT(H_venta.idventa) AS total_ventas
FROM H_venta
JOIN D_empleado ON H_venta.idempleado = D_empleado.idempleado
GROUP BY D_empleado.idempleado;

-- Total de ingresos generados por cada empleado --
SELECT 
  D_empleado.nombre,
  D_empleado.apellido,
  SUM(D_producto.precio * H_venta.cantidad) AS total_ingresos
FROM H_venta
JOIN D_empleado ON H_venta.idempleado = D_empleado.idempleado
JOIN D_producto ON H_venta.idproducto = D_producto.idproducto
GROUP BY D_empleado.idempleado;

-- Todos los productos vendidos a un cliente específico --
SELECT 
  D_cliente.nombre AS nombre_cliente,
  D_cliente.apellido AS apellido_cliente,
  D_producto.nombre AS nombre_producto,
  H_venta.cantidad,
  D_tiempo.fecha
FROM H_venta
JOIN D_cliente ON H_venta.DNI = D_cliente.DNI
JOIN D_tiempo ON H_venta.idtiempo = D_tiempo.idtiempo
JOIN D_producto ON H_venta.idproducto = D_producto.idproducto
WHERE D_cliente.DNI = 2; 

-- Ingresos totales generados por cada cliente --
SELECT 
  D_cliente.nombre,
  D_cliente.apellido,
  SUM(D_producto.precio * H_venta.cantidad) AS total_gastado
FROM H_venta
JOIN D_cliente ON H_venta.DNI = D_cliente.DNI
JOIN D_producto ON H_venta.idproducto = D_producto.idproducto
GROUP BY D_cliente.DNI;

-- Productos más vendidos y su cantidad total vendida --
SELECT 
  D_producto.nombre,
  SUM(H_venta.cantidad) AS total_vendido
FROM H_venta
JOIN D_producto ON H_venta.idproducto = D_producto.idproducto
GROUP BY D_producto.idproducto
ORDER BY total_vendido DESC;









    

