const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

// Configuración de CORS
app.use(cors());  

// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(express.json({ limit: '50mb' })); // Aumenta el límite del tamaño del cuerpo a 50MB o al valor adecuado

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).send({ error: 'Error en el análisis de JSON' });
  } else {
    next();
  }
});

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'admin1234',
  database: 'judelkin',
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Importar y usar rutas para la base de datos `judelkin`
const crudRoutes = require('./Routes/crudRoutes')(db);
app.use('/crud', crudRoutes);

// Configuración de la conexión a la segunda base de datos
const db2 = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'admin1234',
  database: 'judelkin_dm',
});

db2.connect((err) => {
  if (err) {
    console.error('Error de conexión a la segunda base de datos:', err);
  } else {
    console.log('Conexión exitosa a la segunda base de datos');
  }
});

// Importar y usar rutas para la segunda base de datos `control`
const crudRoutes2 = require('./Routes/crudRoutes2')(db2);
app.use('/crudRoutes2', crudRoutes2);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend en funcionamiento en el puerto ${port}`);
});
