create database control;
use control;

CREATE TABLE H_venta (
  idventa int auto_increment primary key,
  fecha date,
  tipo_de_venta int,
  precio decimal,
  cantidad int,
  idempleado int,
  DNI int,
  idproducto int,
  idtiempo int,
  foreign key (idempleado) references D_empleado (idempleado),
  foreign key (DNI) references D_cliente (DNI),
  foreign key (idproducto) references D_producto (idproducto),
  foreign key (idtiempo) references D_tiempo(idtiempo)
);

CREATE TABLE D_cliente (
  DNI int auto_increment primary key,
  nombre varchar(80),
  apellido varchar(80),
  direccion varchar(255),
  correo varchar(255),
  telefono varchar(8)
);

CREATE TABLE D_empleado (
  idempleado int auto_increment primary key,
  nombre varchar(80),
  apellido varchar(30),
  telefono varchar(8),
  direccion varchar(50),
  correo varchar(25)
);

CREATE TABLE D_producto (
  idproducto int auto_increment primary key,
  nombre varchar(30),
  existencia int,
  precio decimal,
  descripcion varchar(30),
  porcentaje_alcohol decimal,
  categoria varchar(50)
);

CREATE TABLE D_tiempo (
  idtiempo int auto_increment primary key,
  fecha date,
  ayo int,
  mes int,
  semana int,
  diasemana varchar(10)
);

