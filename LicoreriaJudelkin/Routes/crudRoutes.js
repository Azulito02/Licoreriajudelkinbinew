const express = require('express');
const router = express.Router();





//Ruta para consultar clientes
module.exports = (db) => {

  // Ruta para verificar las credenciales y obtener el rol del usuario
  router.post('/login', (req, res) => {
    const { nombre_Usuario, contrasena } = req.body;

    if (!nombre_Usuario || !contrasena) {
      return res.status(400).json({ error: 'Nombre de usuario y contraseña son obligatorios' });
    }

    // Realizar la consulta para verificar las credenciales en la base de datos
    const sql = `SELECT rol FROM Usuario WHERE nombre_Usuario = ? AND contrasena = ?`;
    db.query(sql, [nombre_Usuario, contrasena], (err, result) => {
      if (err) {
        console.error('Error al verificar credenciales:', err);
        return res.status(500).json({ error: 'Error al verificar credenciales' });
      }

      if (result.length === 1) {
        const { rol } = result[0];
        res.json({ rol }); // Devolver el rol si las credenciales son correctas
      } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
      }
    });
  });

 //

  router.get('/readcliente', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'SELECT * FROM cliente';

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  //Ruta para consultar productos

  router.get('/readproducto', (req, res) => {

    const sql = 'SELECT * FROM producto';
  
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al leer registros:', err);
            res.status(500).json({ error: 'Error al leer registros' });
        } else {
            res.status(200).json(result);
        }
    });
  });

  //Ruta para consultar empleados

  router.get('/readempleado', (req, res) => {

    const sql = 'SELECT * FROM empleado';
  
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al leer registros:', err);
            res.status(500).json({ error: 'Error al leer registros' });
        } else {
            res.status(200).json(result);
        }
    });
  }); 

  //Ruta para consultar marca

  router.get('/readmarca', (req, res) => {

    const sql = 'SELECT * FROM marca';
  
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al leer registros:', err);
            res.status(500).json({ error: 'Error al leer registros' });
        } else {
            res.status(200).json(result);
        }
    });
  });

  //Ruta para consultar pedidos

  router.get('/readpedido', (req, res) => {

    const sql = 'SELECT * FROM pedido';
  
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al leer registros:', err);
            res.status(500).json({ error: 'Error al leer registros' });
        } else {
            res.status(200).json(result);
        }
    });
  });

    //Ruta para consultar ventas

    router.get('/readventa', (req, res) => {

      const sql = 'SELECT * FROM venta';
    
      db.query(sql, (err, result) => {
          if (err) {
              console.error('Error al leer registros:', err);
              res.status(500).json({ error: 'Error al leer registros' });
          } else {
              res.status(200).json(result);
          }
      });
    });

    //Ruta para consultar detalle de ventas

    router.get('/readdetalleventa', (req, res) => {

      const sql = 'SELECT * FROM detalleventa';
    
      db.query(sql, (err, result) => {
          if (err) {
              console.error('Error al leer registros:', err);
              res.status(500).json({ error: 'Error al leer registros' });
          } else {
              res.status(200).json(result);
          }
      });
    });

  // Ruta para crear un nuevo cliente
   
   router.post('/createcliente', (req, res) => {
    const { nombre, apellido, direccion, correo, telefono } = req.body;
  
    // Verifica si se proporcionó el nombre de la categoría
    if (!nombre ||!apellido ||!direccion ||! correo ||! telefono) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    // Consulta SQL para insertar una nueva categoría
    const sql = 'INSERT INTO cliente (nombre,apellido,direccion,correo,telefono) VALUES (?,?,?,?,?)';
    const values = [nombre,apellido,direccion,correo,telefono];
  
    // Ejecuta la consulta SQL
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar cliente:', err);
        res.status(500).json({ error: 'Error al insertar cliente' });
      } else {
        // Devuelve una respuesta exitosa
        res.status(201).json({ message: 'Cliente agregado con éxito' });
      }
    });
  });

  // Ruta para crear un nuevo producto
   
  router.post('/createproducto', (req, res) => {
    const {nombre, existencia, precio, descripcion, porcentaje_alcohol, idcategoria, imagen} = req.body;
  

    if (!nombre || !existencia || !precio || !descripcion || !porcentaje_alcohol || !idcategoria || !imagen) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    // Consulta SQL para insertar un nuevo producto
    const sql = 'INSERT INTO producto (nombre, existencia, precio, descripcion, porcentaje_alcohol, idcategoria, imagen) VALUES (?,?,?,?,?,?,?)';
    const values = [nombre, existencia, precio, descripcion, porcentaje_alcohol, idcategoria, imagen];
  
    // Ejecuta la consulta SQL
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar producto:', err);
        res.status(500).json({ error: 'Error al insertar producto' });
      } else {
        // Devuelve una respuesta exitosa
        res.status(201).json({ message: 'Producto agregado con éxito' });
      }
      
    });
  });

    //Ruta para insertar Usuarios

    router.post('/createempleado', (req, res) => {
      const {nombre, apellido, telefono, direccion, correo} = req.body
    
      // Verifica si se proporcionó el nombre del empleado
      if (!nombre ||!apellido ||!telefono ||!direccion ||!correo) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
    
      // Consulta SQL para insertar una nueva categoría
      const sql = 'INSERT INTO empleado (nombre, apellido, telefono, direccion, correo) VALUES (?,?,?,?,?)';
      const values = [nombre, apellido, telefono, direccion, correo];
    
      // Ejecuta la consulta SQL
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error al insertar empleado:', err);
          res.status(500).json({ error: 'Error al insertar Usuario' });
        } else {
          // Devuelve una respuesta exitosa
          res.status(201).json({ message: 'empleado agregado con éxito' });
        }
      });
    });

    //Ruta para insertar pedidos

   // router.post('/createpedido', (req, res) => {
      //


    //Ruta para insertar categorias

    //
   
    // Ruta para registrar una venta con su detalle
  router.post('/createventa', (req, res) => {
    // Extraer datos de la solicitud
    const { fecha, DNI, idempleado, tipo_de_venta, detalle} = req.body;

    // Realizar la inserción de la venta en la tabla Ventas
    const sqlVenta = 'INSERT INTO venta (fecha,DNI, idempleado, tipo_de_venta) VALUES (?, ?, ?, ?)';
    db.query(sqlVenta, [fecha, DNI, idempleado, tipo_de_venta], (err, result) => {
      if (err) {
        console.error('Error al insertar venta:', err);
        return res.status(500).json({ error: 'Error al insertar venta' });
      }

      const idventa = result.insertId; // Obtener el ID de la venta insertada

      // Iterar sobre el detalle de la venta y realizar inserciones en DetalleVenta
      const sqlDetalle = 'INSERT INTO detalleventa (cantidad, precio, idproducto, idventa) VALUES ?';
      const values = detalle.map((item) => [item.cantidad, item.precio, item.idproducto, idventa]);
      db.query(sqlDetalle, [values], (err, result) => {
        if (err) {
          console.error('Error al insertar detalle de venta:', err);
          return res.status(500).json({ error: 'Error al insertar detalle de venta' });
        }

        // Devolver respuesta exitosa
        res.status(201).json({ message: 'Venta y detalle de venta agregados con éxito' });
      });
    });
  });

    //Ruta para insertar detalle de venta

    router.post('/createdetalleventa', (req, res) => {
      const {cantidad, precio} = req.body
    
      // Verifica si se proporcionó el nombre de la categoría
      if (!cantidad ||!precio) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
    
      // Consulta SQL para insertar una nueva categoría
      const sql = 'INSERT INTO detalleventa (cantidad, precio) VALUES (?,?)';
      const values = [cantidad, precio];
    
      // Ejecuta la consulta SQL
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error al insertar detalle de venta:', err);
          res.status(500).json({ error: 'Error al insertar el detalle de venta' });
        } else {
          // Devuelve una respuesta exitosa
          res.status(201).json({ message: 'venta agregada con éxito' });
        }
      });
    });


    //Ruta para actualizar un registro existente por ID (Marca)

    


    //Ruta para actualizar un registro existente por ID (producto)

    router.put('/updateproducto/:id', (req, res) => {
      const idproducto = req.params.id;
      const { nombre, existencia, precio, descripcion, porcentaje_alcohol, idcategoria, imagen } = req.body;
    
      if (!nombre || !existencia || !precio || !descripcion || !porcentaje_alcohol || !idcategoria || !imagen) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
    
      // Consulta SQL para actualizar un producto
      const sql = 'UPDATE producto SET nombre = ?, existencia = ?, precio = ?, descripcion = ?, porcentaje_alcohol = ?, idcategoria = ?, imagen = ? WHERE idproducto = ?';
      const values = [nombre, existencia, precio, descripcion, porcentaje_alcohol, idcategoria, imagen, idproducto];
    
      // Ejecuta la consulta SQL
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error al actualizar el producto:', err);
          res.status(500).json({ error: 'Error al actualizar el producto' });
        } else {
          // Verifica si el producto fue actualizado exitosamente
          if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Producto actualizado con éxito' });
          } else {
            res.status(404).json({ error: 'Producto no encontrado' });
          }
        }
      });
    });
    

     //Ruta para actualizar un registro existente por ID (cliente)

    router.put('/updatecliente/:id', (req, res) => {
      // Obtén el ID del registro a actualizar desde los parámetros de la URL
      const id = req.params.id;
  
      // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
      const {nombre, apellido, direccion, correo, telefono} = req.body;
  
      // Verifica si se proporcionaron los datos necesarios
      if (!nombre || !apellido || !direccion || !correo || !telefono ) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
  
      // Realiza la consulta SQL para actualizar el registro por ID
      const sql = `
        UPDATE cliente
        SET nombre=?, apellido=?, direccion=?, correo=?, telefono =?
        WHERE DNI = ?
      `;
  
      const values = [nombre, apellido, direccion, correo, telefono,id];
  
      // Ejecuta la consulta
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error al actualizar el registro:', err);
          res.status(500).json({ error: 'Error al actualizar el registro' });
        } else {
          // Devuelve un mensaje de éxito
          res.status(200).json({ message: 'Registro actualizado con éxito' });
        }
      });
    });


     //Ruta para actualizar un registro existente por ID (empleado)

     router.put('/updateempleado/:id', (req, res) => {
      // Obtén el ID del registro a actualizar desde los parámetros de la URL
      const id = req.params.id;
  
      // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
      const {nombre, apellido, telefono, direccion, correo} = req.body;
  
      // Verifica si se proporcionaron los datos necesarios
      if (!nombre || !apellido || !telefono || !direccion || !correo) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
  
      // Realiza la consulta SQL para actualizar el registro por ID
      const sql = `
        UPDATE empleado
        SET nombre=?, apellido=?, telefono=?, direccion=?, correo =?
        WHERE idempleado = ?
      `;
  
      const values = [nombre, apellido, telefono, direccion, correo, id];
  
      // Ejecuta la consulta
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error al actualizar el registro:', err);
          res.status(500).json({ error: 'Error al actualizar el registro' });
        } else {
          // Devuelve un mensaje de éxito
          res.status(200).json({ message: 'Registro actualizado con éxito' });
        }
      });
    });


    //Ruta para actualizar un registro existente por ID (pedido)

    router.put('/updatepedido/:id', (req, res) => {
      // Obtén el ID del registro a actualizar desde los parámetros de la URL
      const id = req.params.id;
  
      // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
      const {cantidad, fecha, total, costo} = req.body;
  
      // Verifica si se proporcionaron los datos necesarios
      if (!cantidad ) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
  
      // Realiza la consulta SQL para actualizar el registro por ID
      const sql = `
        UPDATE pedido
        SET cantidad=?, fecha=?, total=?, costo = ?
        WHERE idpedido = ?
      `;
  
      const values = [cantidad, fecha, total, costo];
  
      // Ejecuta la consulta
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error al actualizar el registro:', err);
          res.status(500).json({ error: 'Error al actualizar el registro' });
        } else {
          // Devuelve un mensaje de éxito
          res.status(200).json({ message: 'Registro actualizado con éxito' });
        }
      });
    });

    //Ruta para actualizar un registro existente por ID (venta)

    router.put('/updateventa/:id', (req, res) => {
      // Obtén el ID del registro a actualizar desde los parámetros de la URL
      const id = req.params.id;
  
      // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
      const {fecha, tipo_de_venta} = req.body;
  
      // Verifica si se proporcionaron los datos necesarios
      if (!fecha || !tipo_de_venta) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
  
      // Realiza la consulta SQL para actualizar el registro por ID
      const sql = `
        UPDATE venta
        SET fecha=?, tipo_de_venta = ?
        WHERE idventa = ?
      `;
  
      const values = [fecha, tipo_de_venta,id];
  
      // Ejecuta la consulta
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error al actualizar el registro:', err);
          res.status(500).json({ error: 'Error al actualizar el registro dela venta' });
        } else {
          // Devuelve un mensaje de éxito
          res.status(200).json({ message: 'Registro actualizado con éxito' });
        }
      });
    });
 
    //Ruta para actualizar un registro existente por ID (venta)

    router.put('/updatedetalleventa/:id', (req, res) => {
      // Obtén el ID del registro a actualizar desde los parámetros de la URL
      const id = req.params.id;
  
      // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
      const {cantidad, precio} = req.body;
  
      // Verifica si se proporcionaron los datos necesarios
      if (!cantidad) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
  
      // Realiza la consulta SQL para actualizar el registro por ID
      const sql = `
        UPDATE detalleventa
        SET cantidad=?, precio = ?
        WHERE iddetalleventa = ?
      `;
  
      const values = [cantidad, precio,id];
  
      // Ejecuta la consulta
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error al actualizar el registro:', err);
          res.status(500).json({ error: 'Error al actualizar el registro' });
        } else {
          // Devuelve un mensaje de éxito
          res.status(200).json({ message: 'Registro actualizado con éxito' });
        }
      });
    });

    // Ruta para eliminar un registro existente por ID (producto)

  router.delete('/deleteproducto/:id', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id = req.params.id;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM producto WHERE idproducto = ?';

    // Ejecuta la consulta
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });
  
  // Ruta para eliminar un registro existente por ID (cliente)

  router.delete('/deletecliente/:id', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id = req.params.id;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM cliente WHERE DNI = ?';

    // Ejecuta la consulta
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });

  // Ruta para eliminar un registro existente por ID (empleado)

  router.delete('/deleteempleado/:id', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id = req.params.id;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM empleado WHERE idempleado = ?';

    // Ejecuta la consulta
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });

  // Ruta para eliminar un registro existente por ID (marca)

 //

  // Ruta para eliminar un registro existente por ID (pedido)

  router.delete('/deletepedido/:id', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id = req.params.id;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM pedido WHERE idpedido = ?';

    // Ejecuta la consulta
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });

  // Ruta para eliminar un registro existente por ID (venta)

  router.delete('/deleteventa/:id', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id = req.params.id;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM venta WHERE idventa = ?';

    // Ejecuta la consulta
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });

  // Ruta para eliminar un registro existente por ID (detalle de venta)

  router.delete('/deletedetalleventa/:id', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id = req.params.id;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM detalleventa WHERE iddetalleventa = ?';

    // Ejecuta la consulta
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });


  router.put('/updatecategoria/:id', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const id = req.params.id;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const {nombre} = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!nombre) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro por ID
    const sql = `
      UPDATE categoria
      SET nombre = ?
      WHERE idcategoria = ?
    `;

    const values = [nombre,id];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro:', err);
        res.status(500).json({ error: 'Error al actualizar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      }
    });
  });


    // Ruta para eliminar un registro existente por ID (marca)

    router.delete('/deletecategoria/:id', (req, res) => {
      // Obtén el ID del registro a eliminar desde los parámetros de la URL
      const id = req.params.id;
  
      // Realiza la consulta SQL para eliminar el registro por ID
      const sql = 'DELETE FROM categoria WHERE idcategoria = ?';
  
      // Ejecuta la consulta
      db.query(sql, [id], (err, result) => {
        if (err) {
          console.error('Error al eliminar el registro:', err);
          res.status(500).json({ error: 'Error al eliminar el registro' });
        } else {
          // Devuelve un mensaje de éxito
          res.status(200).json({ message: 'Registro eliminado con éxito' });
        }
      });
    });


  //Realizacion de procedimientos almacenados en la tabla empleados

  // Ruta para leer la tabla Categoria de la Base de Datos, empleando procedimientos almacenados

  router.get('/readcategoria', (req, res) => {
    const storedProcedure = 'seleccionarcategoria';
    db.query(`CALL ${storedProcedure}('nombre')`, (err, result) => {
      if (err) {
        console.error(`Error al ejecutar el procedimiento almacenado ${storedProcedure}:`, err);
        res.status(500).json({ error: `Error al ejecutar el procedimiento almacenado ${storedProcedure}`, details: err });
      } else {
        res.status(200).json(result[0]);
      }
    });
  });
  

  // Ruta para insertar registros en la tabla Categoria de la Base de Datos, empleando procedimientos almacenados

router.post('/createcategoria', (req, res) => {
  // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
  const { nombre } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!nombre) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Nombre del procedimiento almacenado
  const storedProcedure = 'InsertarCategoria';

  // Llama al procedimiento almacenado
  db.query(
    `CALL ${storedProcedure}(?)`,
    [nombre],
    (err, result) => {
      if (err) {
        console.error(`Error al ejecutar el procedimiento almacenado ${storedProcedure}:`, err);
        res.status(500).json({ error: `Error al ejecutar el procedimiento almacenado ${storedProcedure}` });
      } else {
        // Devuelve un mensaje como respuesta
        res.status(200).json({ message: 'Registro agregado exitosamente' });
      }
    }
  );
});

router.get('/productosPorCategoria', (req, res) => { 
  const sql = `
      SELECT
      categoria.nombre,
      COUNT(producto.idproducto) AS cantidad
  FROM
      producto
  INNER JOIN
      categoria ON producto.idcategoria = categoria.idcategoria
  GROUP BY
      categoria.idcategoria
`;
db.query(sql, (err, result) => {   
  if (err) {
      console.error('Error al obtener la cantidad de productos por categoría:', err);
      res.status(508).json({ error: 'Error al obtener la cantidad de productos por categoría' });
  }   else {
      res.status(208).json(result);
    }
  });
});
  


  return router;

}; 






  



//Probar en la terminal para insertar un dato.
//curl -X POST -H "Content-Type: application/json" -d "{\"id\":51004,\"name\":\"Managua\",\"countrycode\":\"IDN\",\"district\":\"Distrito 9\",\"population\":1000000}" http://localhost:5000/crud/create


//Probar en la terminal para actualizar un registro existente.
//curl -X PUT -H "Content-Type: application/json" -d "{\"name\":\"NuevoNombre\",\"countrycode\":\"CO\",\"district\":\"NuevoDistrito\",\"population\":2000000}" http://localhost:5000/crud/update/51003

//Probar en la terminal para eliminar un registro, empleado un id existente.
//curl -X DELETE http://localhost:5000/crud/delete/51003