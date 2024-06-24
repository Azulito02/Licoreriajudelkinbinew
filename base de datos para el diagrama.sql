create database control;
use control;
drop database control;

select * from H_venta;

ALTER TABLE H_venta
CHANGE COLUMN existencia cantidad int;

ALTER TABLE D_tiempo
CHANGE COLUMN diasemana trimestre varchar(10);


select * from H_venta;

	CREATE TABLE D_cliente (
	  DNI int primary key,
	  nombre varchar(80),
	  apellido varchar(80),
	  direccion varchar(255),
	  correo varchar(255),
	  telefono varchar(8)
	);

	CREATE TABLE D_empleado (
	  idempleado int primary key,
	  nombre varchar(80),
	  apellido varchar(30),
	  telefono varchar(8),
	  direccion varchar(50),
	  correo varchar(25)
	);

	CREATE TABLE D_producto (
	  idproducto int primary key,
	  nombre varchar(30),
	  existencia int,
	  precio decimal,
	  descripcion varchar(30),
	  porcentaje_alcohol decimal,
	  nombre_categoria varchar(50)
	);

	CREATE TABLE D_tiempo (
	  idtiempo int primary key,
	  fecha date,
	  ayo int,
	  mes int,
	  semana int,
	  trimestre varchar(10)
	);

	CREATE TABLE H_venta (
	  iddetalleventa int primary key,
	  idventa int,
	  tipo_de_venta varchar(255),
	  precio decimal,
	  cantidad int,
	  DNI int,
	  idempleado int,
	  idproducto int,
	  idtiempo int,
	  foreign key (DNI) references D_cliente (DNI),
	  foreign key (idempleado) references D_empleado (idempleado),
	  foreign key (idproducto) references D_producto (idproducto),
	  foreign key (idtiempo) references D_tiempo(idtiempo)
	);

TRUNCATE TABLE H_VENTA;


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


select * from D_tiempo;

-- Inserción en la tabla D_cliente
INSERT INTO D_cliente (DNI, nombre, apellido, direccion, correo, telefono)
VALUES (123456781, 'Juan', 'Pérez', 'Calle 123', 'juan@example.com', '12345678');

-- Inserción en la tabla D_empleado
INSERT INTO D_empleado (idempleado, nombre, apellido, telefono, direccion, correo)
VALUES (1002, 'Carlos', 'García', '98765432', 'Avenida Principal 456', 'carlos@example.com');

-- Inserción en la tabla D_producto
INSERT INTO D_producto (idproducto, nombre, existencia, precio, descripcion, porcentaje_alcohol, nombre_categoria)
VALUES (5002, 'Producto A', 100, 25.50, 'Descripción del Producto A', 0.0, 'cerveza');

-- Inserción en la tabla D_tiempo
INSERT INTO D_tiempo (idtiempo, fecha, ayo, mes, semana, trimestre)
VALUES (2, '2024-05-09', 2024, 5, 19, 'Segundo');

-- Inserción en la tabla H_venta
INSERT INTO H_venta (idventa, iddetalleventa, fecha, tipo_de_venta, precio, cantidad, DNI, idempleado, idproducto, idtiempo)
VALUES (1, 2, '2024-05-09', 'Venta', 25.50, 2, 123456789, 1001, 5002, 2);

select * from H_venta;


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
    trimestre, 
    SUM(precio * cantidad) AS Ventas_totales
FROM 
    H_venta
JOIN 
    D_Tiempo ON H_venta.idtiempo = D_Tiempo.idtiempo
WHERE 
    Ayo = 2024 AND Mes = 1
GROUP BY 
    trimestre;
    

-- Ventas totales por producto:
SELECT 
    p.idproducto, 
    p.nombre, 
    SUM(hv.precio) AS Cantidad_vendida, 
    SUM(hv.cantidad) AS Ventas_totales
FROM 
    H_venta hv
JOIN 
    d_producto p ON hv.idproducto = p.idproducto
GROUP BY 
    p.idproducto, p.nombre;
    
-- Ventas totales por categoría de producto:
SELECT 
    p.nombre_categoria,
    SUM(hv.cantidad) AS Ventas_Totales
FROM 
    H_venta hv
JOIN 
    D_producto p ON hv.idproducto = p.idproducto
GROUP BY 
    p.nombre_categoria
ORDER BY 
    Ventas_Totales DESC;


SELECT p.nombre, SUM(hv.cantidad) AS Ventas_Totales 
FROM H_venta hv 
JOIN D_Producto p ON hv.idproducto = p.idproducto 
GROUP BY p.nombre 
ORDER BY Ventas_Totales DESC 
LIMIT 0, 300;

-- Ventas de productos en stock (productos con stock mayor a 0):
SELECT 
    p.nombre,
    SUM(hv.cantidad) AS Ventas_Totales
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
    AVG(hv.cantidad) AS Promedio_Ventas
FROM 
    H_Venta hv
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
    SUM(hv.cantidad) AS Ventas_Totales
FROM 
    H_Venta hv
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
    SUM(hv.cantidad) AS Cantidad_Total_Vendida
FROM 
    H_Venta hv
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
    SUM(hv.cantidad) AS Ventas_Totales
FROM 
    H_Venta hv
JOIN 
    D_Producto p ON hv.idproducto = p.idproducto
GROUP BY 
    p.nombre
ORDER BY 
    Ventas_Totales DESC
LIMIT 5;