// Importación de los módulos necesarios
const express = require('express'); // Módulo Express para manejar y responder a peticiones HTTP
const fs = require('fs'); // Módulo del sistema de archivos para leer archivos
const app = express(); // Creación de una aplicación Express
const port = 3000; // Puerto en el que el servidor estará escuchando

// Middleware para servir archivos estáticos. 'public' es el nombre de la carpeta donde están los archivos
app.use(express.static('public')); 

// Definición de una ruta en el servidor. '/data/:page' es un endpoint que espera un parámetro 'page'
app.get('/data/:page', (req, res) => {
  const page = req.params.page; // Extracción del parámetro 'page' de la URL

  // Lectura del archivo correspondiente al número de página especificado en la URL
  fs.readFile(`posts_pagina_${page}.json`, 'utf8', (err, data) => {
    if (err) {
      // Si ocurre un error al leer el archivo (p.ej., el archivo no existe), se envía un error 404
      res.status(404).send('Data not found');
      return;
    }
    // Si no hay errores, se parsea el JSON leído y se envía como respuesta
    res.json(JSON.parse(data));
  });
});

// El servidor comienza a escuchar en el puerto especificado
app.listen(port, () => {
  // Mensaje de confirmación de que el servidor está corriendo y listo para recibir peticiones
  console.log(`Escuchando el servidor en el host http://localhost:${port}`);
});
