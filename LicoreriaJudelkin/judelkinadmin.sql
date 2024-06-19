CREATE DATABASE judelkin;
use judelkin;
drop database judelkin;

ALTER TABLE producto
ADD imagen longtext; 
	
ALTER TABLE venta
MODIFY COLUMN tipo_de_venta varchar(255);


ALTER USER 'root'@'localhost' identified with mysql_native_password BY 'milton1234';
flush  privileges;

CREATE TABLE Imagenes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  imagenUrl VARCHAR(255) NOT NULL
);

INSERT INTO Imagenes (nombre, imagenUrl)
VALUES ('Nombre de la imagen', 'URL_de_la_imagen');

CREATE TABLE usuario (
  id_Usuario Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_Usuario Varchar(30) NOT NULL,
  contrasena Varchar(16) NOT NULL,
  rol Varchar(20) NOT NULL
);

INSERT INTO Usuario (nombre_Usuario, contrasena, rol)  VALUES ('mil02','12345', 'admin');
INSERT INTO Usuario (nombre_Usuario, contrasena, rol)  VALUES ('julio','123456', 'ventas');
SELECT * FROM usuario;

CREATE TABLE producto (
  idproducto int auto_increment primary key,
  nombre varchar(30),
  existencia int,
  precio decimal,
  descripcion varchar(30),
  porcentaje_alcohol decimal,
  idcategoria int,
  foreign key (idcategoria) references categoria (idcategoria)
);

CREATE TABLE empleado (
  idempleado int auto_increment primary key,
  nombre varchar(80),
  apellido varchar(30),
  telefono varchar(8),
  direccion varchar(50),
  correo varchar(25)
);

select * from categoria;

CREATE TABLE cliente (
  DNI int auto_increment primary key,
  nombre varchar(80),
  apellido varchar(80),
  direccion varchar(255),
  correo varchar(255),
  telefono varchar(8)
);

CREATE TABLE categoria (
  idcategoria int auto_increment primary key,
  nombre_categoria varchar(255)
);

ALTER TABLE categoria
CHANGE COLUMN nombre nombre_categoria varchar(255);

select * from detalleventa;
CREATE TABLE venta (
  idventa int auto_increment primary key,
  fecha date,
  tipo_de_venta varchar(255),
  DNI int,
  idempleado int,
  foreign key (idempleado) references empleado (idempleado),
  foreign key (DNI) references cliente (DNI)
);

CREATE TABLE detalleventa (
  iddetalleventa int auto_increment primary key,
  cantidad int,
  precio decimal,
  idproducto int,
  idventa int,
  foreign key (idproducto) references producto (idproducto),
  foreign key (idventa) references venta (idventa)
);

select * from detalleventa;
select * from venta;
select * from producto;
select * from cliente;
select * from empleado;
/*Inserciones*/
INSERT INTO producto (nombre, existencia, precio, descripcion, porcentaje_alcohol, idcategoria, imagen)
VALUES ('bamboo', 2, 125, 'galon', '35','1');

select * from producto;

	DELETE FROM detalleventa;
INSERT INTO venta(fecha, tipo_de_venta,DNI,idempleado)
VALUES ('2024-05-29', 'presencial',1 ,1);

INSERT INTO detalleventa(cantidad, precio, idproducto,idventa)
VALUES (31, 600, 4,1);

INSERT INTO cliente (nombre, apellido, direccion, correo, telefono)
VALUES ('juan', 'roman', 'norte', 'juanroman@gmail.com', '83876752');

INSERT INTO categoria (nombre_categoria)
VALUES ('vodka');

select * from categoria;

INSERT INTO empleado(nombre, apellido, telefono, direccion, correo)
VALUES ('juani', 'baez', '87654321', 'avenida1', 'juanbaez@gmail.com');


INSERT INTO venta(fecha, tipo_de_venta)
VALUES ('2024-05-29', 'linea');

INSERT INTO detalleventa(cantidad, precio)
VALUES (30, 600);

select * from detalleventa;



/*Actualizaciones*/
update venta 
set fecha = '2023-10-06',
	tipo_de_venta = 'en linea'
    where idventa = 1;


update detalleventa
set cantidad = 50,
	precio = 150
    where iddetalleventa = 1;
    
update producto
set nombre = 'vodka',
	existencia = 1,
    precio = 70,
    descripcion = 'agua ardiente',
    porcentaje_alcohol = 6.9
    where idproducto = 4;
    
update empleado
set nombre = 'lennox',
    apellido = 'duarte',
    telefono = '87868509',
    direccion = 'calle24',
    correo = 'lennoxduarte@gmail.com'
    where idempleado = 1;
    
    update categoria
    set nombre_categoria = 'blue label'
    where idcategoria = 1;
    
    select * from categoria;
    
    DELETE FROM categoria WHERE idcategoria = 1;
    
    select * from empleado;
    
update cliente 
set nombre = 'narutp',
    apellido = 'uzumaki',
    direccion = 'calle9',
    correo = 'narutouzumaki@gmail.com',
    telefono = '87868509'
    where DNI = 1;
    
    /*procedimiento eliminar*/
    
  
    
    select * from categoria;
    
 DELETE FROM producto WHERE idproducto = 1;



select *
from producto;

/*creacion de rol administrador*/
create role 'administrador';

/*asignacion de permisos a roles*/

GRANT ALL ON judelkin.* TO 'administrador';

/*creacion de usuario*/

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin1234';

/* asigno rol al usuario creado */

GRANT 'administrador' TO 'admin'@'localhost';

SHOW GRANTS FOR 'admin'@'localhost';
SHOW GRANTS FOR 'admin'@'localhost' USING 'administrador';

select CURRENT_ROLE();

SET default ROLE ALL TO 
'admin'@'localhost';

GRANT SUPER ON *.* TO 'admin'@'localhost';

/*creacion de rol vendedor*/
create role 'vendedor';

/*asignacion de permisos a roles*/

GRANT SELECT, INSERT, UPDATE, DELETE ON judelkin.* TO 'vendedor';

/*creacion de usuario*/

CREATE USER 'ventas'@'localhost' IDENTIFIED BY 'ventas1234';

/* asigno rol al usuario creado */

GRANT 'vendedor' TO 'ventas'@'localhost';

SHOW GRANTS FOR 'ventas'@'localhost';
SHOW GRANTS FOR 'ventas'@'localhost' USING 'vendedor';

select CURRENT_ROLE();

SET default ROLE ALL TO 
'ventas'@'localhost';

/*creacion de rol lector*/
create role 'lector';

/*asignacion de permisos a roles*/

GRANT SELECT ON judelkin.* TO 'lector';

/*creacion de usuario*/

CREATE USER 'lector'@'localhost' IDENTIFIED BY 'lector1234';

/* asigno rol al usuario creado */

GRANT 'lector' TO 'lector'@'localhost';

SHOW GRANTS FOR 'lector'@'localhost';
SHOW GRANTS FOR 'lector'@'localhost' USING 'lector';

select CURRENT_ROLE();

SET default ROLE ALL TO 
'lector'@'localhost';


/*creacion de tabla bitacora*/

CREATE TABLE bitacora(
idbitacora int not null auto_increment primary key,
transaccion varchar(10) NOT NULL,
usuario varchar(40) NOT NULL,
fecha datetime not null,
tabla varchar(20) not null
);

/*creacion de trigger ala tabla producto*/

select * from producto;

CREATE TRIGGER insertproducto
AFTER INSERT ON producto
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES('INSERT', current_user(), now(),'producto');

CREATE TRIGGER updateproducto
AFTER UPDATE ON producto
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES('UPDATE', current_user(), now(),'producto');

CREATE TRIGGER deleteproducto
AFTER DELETE ON producto
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES('DELETE', current_user(), now(),'producto');

select * from bitacora;

select * from empleado;

/*creacion de trigger ala tabla empleado*/

CREATE TRIGGER insertempleado
AFTER INSERT ON empleado
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES('INSERT', current_user(), now(),'empleado');

CREATE TRIGGER updatempleado
AFTER UPDATE ON empleado
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES('UPDATE', current_user(), now(),'empleado');

CREATE TRIGGER deleteempleado
AFTER DELETE ON empleado
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES('DELETE', current_user(), now(),'empleado');

/*creacion de trigger ala tabla cliente*/

CREATE TRIGGER insertcliente
AFTER INSERT ON cliente
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES('INSERT', current_user(), now(),'cliente');

CREATE TRIGGER updatecliente
AFTER UPDATE ON cliente
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES('UPDATE', current_user(), now(),'cliente');

CREATE TRIGGER deletecliente
AFTER DELETE ON cliente
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES('DELETE', current_user(), now(),'cliente');


/*creacion de trigger categoria*/

CREATE TRIGGER insertcategoria
AFTER INSERT ON categoria
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES('INSERT', current_user(), now(),'categoria');

CREATE TRIGGER updatecategoria
AFTER UPDATE ON categoria
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES('UPDATE', current_user(), now(),'categoria');

CREATE TRIGGER deletecategoria
AFTER DELETE ON categoria
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES('DELETE', current_user(), now(),'categoria');

/*creacion de trigger sobre la tabla venta*/

CREATE TRIGGER insertventa
AFTER INSERT ON venta
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES('INSERT', current_user(), now(),'venta');

CREATE TRIGGER updateventa
AFTER UPDATE ON venta
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES('UPDATE', current_user(), now(),'venta');

CREATE TRIGGER deleteventa
AFTER DELETE ON venta
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES('DELETE', current_user(), now(),'venta');

/*creacion de trigger ala tabla detalleventa*/

CREATE TRIGGER insertdetalleventa
AFTER INSERT ON detalleventa
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES('INSERT', current_user(), now(),'detalleventa');

CREATE TRIGGER updatedetalleventa
AFTER UPDATE ON detalleventa
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES('UPDATE', current_user(), now(),'detalleventa');

CREATE TRIGGER deletedetalleventa
AFTER DELETE ON detalleventa
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES('DELETE', current_user(), now(),'detalleventa');

/*Procedimientos almacenados*/

/*Procedimientos almacenados de insertar*/

-- INSERTAR PRODUCTOS

DELIMITER //

CREATE PROCEDURE insertarproducto(
    IN nombre VARCHAR(30),
    IN cantidad INT,
    IN precio decimal(12, 4),
    IN descripcion VARCHAR(30),
	IN idcategoria INT,
	IN porcentaje_alcohol decimal(10,0)
   
   
)
BEGIN
    INSERT INTO producto (nombre, cantidad, precio, descripcion, idcategoria, porcentaje_alcohol)
    VALUES (nombre, cantidad, precio, descripcion, idcategoria, porcentaje_alcohol);
END //

DELIMITER ;


-- INSERTAR DetalleVenta

DELIMITER //

CREATE PROCEDURE InsertarDetalleVenta(
    IN cantidad INT,
    IN precio decimal,
    IN idproducto INT,
    IN idventa INT
    
)
BEGIN
    INSERT INTO DetalleVenta (cantidad,precio,idproducto, idventa)
    VALUES (cantidad,precio,idproducto, idventa);
END //

DELIMITER ;

-- INSERTAR Cliente

DELIMITER //

CREATE PROCEDURE InsertarClientes(
    IN nombre VARCHAR(80),
    IN apellido VARCHAR(80),
    IN direccion VARCHAR(255),
    IN correo VARCHAR(255)
  
)
BEGIN
    INSERT INTO Clientes (nombre, correo, direccion, apellido)
    VALUES (nombre, correo, direccion, apellido);
END //

DELIMITER ;

-- INSERTAR Categoria

DELIMITER //

CREATE PROCEDURE InsertarCategoria(
IN nombre VARCHAR (255)
)
BEGIN
INSERT INTO Categoria (nombre) VALUES (nombre);
END //

DELIMITER ;

-- INSERTAR Empleados

DELIMITER //

CREATE PROCEDURE InsertarEmpleados(
IN nombre VARCHAR(80),
IN apellido VARCHAR(30),
IN telefono VARCHAR(8),
IN direccion VARCHAR(50),
IN correo VARCHAR(25)
)
BEGIN
INSERT INTO Marcas (nombre, apellido, telefono, direccion, correo)
 VALUES (nombre, apellido, telefono, direccion, correo);
END //

DELIMITER ;

-- Procedimientos Actualizar

-- ACTUALIZAR CATEGORIA

DELIMITER //

CREATE PROCEDURE ActualizarCategoria(IN nuevoNombre VARCHAR(255))
BEGIN
    -- Lógica para actualizar la categoría
    UPDATE categoria
    SET nombre = nuevoNombre
    WHERE idcategoria = idcategoria;
END //

DELIMITER ;


CALL ActualizarCategoria('afua');

select * from categoria;

DROP PROCEDURE IF EXISTS ActualizarCategoria;

-- ACTUALIZAR PRODUCTOS

DELIMITER //

CREATE PROCEDURE actualizarproducto(
    IN idProducto INT,
    IN nombre VARCHAR(30),
    IN descripcion VARCHAR(30),
    IN precio DECIMAL,
    IN cantidad INT,
    IN idcategoria INT,
    IN porcentaje_alcohol decimal
)
BEGIN
    UPDATE producto
    SET
        nombre = nombre,
        descripcion = descripcion,
        precio = precio,
        existencia = existencia,
        idcategoria = idcategoria,
        porcentaje_alcohol = porcentaje_alcohol
    WHERE idProducto = idProducto;
END //

DELIMITER ;

-- ACTUALIZAR Clientes

DELIMITER //

CREATE PROCEDURE actualizarcliente(
    IN DNI INT,
    IN nombre VARCHAR(80),
    IN correo VARCHAR(255),
    IN direccion VARCHAR(255),
    IN apellido VARCHAR(80)
)
BEGIN
    UPDATE cliente
    SET
        nombre = nombre,
        correo = correo,
        direccion = direccion,
		apellido = apellido
    WHERE DNI = DNI;
END //

DELIMITER ;

/*ACTUALIZAR EMPLEADO*/

DELIMITER //

CREATE PROCEDURE actualizarempleado(
    IN idempleado INT,
    IN nombre VARCHAR(80),
    IN apellido VARCHAR(80),
    IN telefono VARCHAR(8),
    IN direccion VARCHAR(80),
    IN correo VARCHAR(25)
)
BEGIN
    UPDATE empleado
    SET
        nombre = nombre,
        apellido = apellido,
        telefono = telefono,
		direccion = apellido,
        correo = correo
    WHERE idempleado = idempleado;
END //

DELIMITER ;

/*ACTUALIAZAR DETALLE VENTA*/

DELIMITER //

CREATE PROCEDURE actualizardetalleventa(
    IN cantidad INT,
    IN precio DECIMAL(10,0),
    IN idproducto INT,
    IN idventa INT
)
BEGIN
    UPDATE detalleventa
    SET
        cantidad = cantidad,
        precio = precio,
        idproducto = idproducto,
		idventa = idventa
    WHERE iddetalleventa = iddetalleventa;
END //

DELIMITER ;

/*ACTUALIZAR VENTA*/

DELIMITER //

CREATE PROCEDURE actualizarventa(
    IN fecha DATE,
    IN cantidad INT,
    IN DNI INT,
    IN idempleado INT
)
BEGIN
    UPDATE venta
    SET
        fecha = fecha,
        cantidad = cantidad,
        DNI = DNI,
		idempleado = idempleado
    WHERE idventa = idventa;
END //

DELIMITER ;

/*PROCEDIMIENTOS DE ELIMINAR*/

/*ELIMINAR VENTA*/

DELIMITER //

CREATE PROCEDURE eliminarventa(
    IN fecha DATE,
    IN cantidad INT,
    IN DNI INT,
    IN idempleado INT
)
BEGIN
    DELETE FROM venta
    WHERE fecha = fecha
    AND cantidad = p_cantidad
    AND DNI = DNI
    AND idempleado = idempleado;
END //

DELIMITER ;

/*ELIMINAR DETALLE VENTA*/

DELIMITER //

CREATE PROCEDURE eliminardetalleventa(
    IN cantidad INT,
    IN precio decimal(10,0),
    IN idproducto INT,
    IN idventa INT
)
BEGIN
    DELETE FROM detalleventa
    WHERE cantidad = cantidad
    AND precio = precio
    AND idproducto = idproducto
    AND idventa = idventa;
END //

DELIMITER ;

/*ELIMINAR PRODUCTO*/

DELIMITER //

CREATE PROCEDURE eliminarproducto(
    IN nombre VARCHAR(30),
    IN cantidad int,
    IN precio decimal(10,0),
    IN descripcion varchar(30),
    IN idmarca int,
    IN porcentaje_alcohol decimal(10,0)
)
BEGIN
    DELETE FROM producto
    WHERE idproducto = idproducto
    AND nombre = nombre
    AND cantidad = cantidad
    AND precio = precio
    AND descripcion = descripcion
    AND idcategoria = idcategoria
    AND porcentaje_alcohol = porcentaje_alcohol;
END //

DELIMITER ;

/*ELIMINAR EMPLEADO*/

DELIMITER //

CREATE PROCEDURE eliminarempleado(
    IN nombre VARCHAR(30),
    IN apellido VARCHAR(30),
    IN telefono VARCHAR(30),
    IN direccion varchar(30),
    IN correo VARCHAR(30)
)
BEGIN
    DELETE FROM empleado
    WHERE idempleado = idempleado
    AND nombre = nombre
    AND apellido = apellido
    AND telefono = telefono
    AND direccion = direccion
    AND correo = correo;
END //

DELIMITER ;

/*ELIMINAR CLIENTE*/

DELIMITER //

CREATE PROCEDURE eliminarcliente(
    IN nombre VARCHAR(30),
    IN apellido VARCHAR(30),
    IN direccion VARCHAR(30),
    IN correo varchar(30),
    IN telefono VARCHAR(30)
)
BEGIN
    DELETE FROM cliente
    WHERE idcliente = idcliente
    AND nombre = nombre
    AND apellido = apellido
    AND direccion = direccion
    AND correo = correo
    AND telefono = telefono;
END //

DELIMITER ;

/*eliminar categoria*/

DELIMITER //

CREATE PROCEDURE eliminarcategoria(
    IN nombre VARCHAR(255)
)
BEGIN
    DELETE FROM categoria
    WHERE idcategoria = idcategoria
    AND nombre = nombre;
END //

DELIMITER ;

/*Procedimiento de lectura*/

/*Seleccionar venta*/

DELIMITER //

CREATE PROCEDURE seleccionarventa(
    IN fecha DATE,
    IN cantidad INT,
    IN DNI INT,
    IN idempleado INT
)
BEGIN
    SELECT *
    FROM venta
    WHERE idventa = idventa
    AND fecha = fecha
    AND cantidad = cantidad
    AND DNI = DNI
    AND idempleado = idempleado;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE seleccionarcategoria(IN nombre VARCHAR(255))
BEGIN
    SELECT *
    FROM categoria
    WHERE nombre = nombre;
END //

DELIMITER ;

CALL seleccionarcategoria('nombre');


DROP PROCEDURE IF EXISTS seleccionarcategoria;

//Triggers para actualizar el stock de los productos una vez realizada una compra

DELIMITER //
CREATE TRIGGER actualizar_cantidad_producto
AFTER INSERT ON detalleventa
FOR EACH ROW
BEGIN
    -- Actualizar la cantidad en la tabla Productos restando la cantidad comprada
    UPDATE producto
    SET existencia = existencia - NEW.cantidad
    WHERE idproducto = NEW.idproducto;
END;


DELIMITER ;

/*DROP TRIGGER IF EXISTS calcular_total_venta;*/

/*DROP PROCEDURE IF EXISTS ActualizarProductos ;*/