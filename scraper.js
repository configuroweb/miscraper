// Importación de módulos necesarios
const axios = require('axios'); // Axios para hacer peticiones HTTP
const cheerio = require('cheerio'); // Cheerio para analizar y manipular el HTML
const fs = require('fs'); // Módulo de sistema de archivos para guardar datos en archivos

// Función que realiza el scraping de una página específica en el sitio web
function scrapePage(pageNumber) {
  // Construcción de la URL de la página a scrapear
  const url = `https://www.configuroweb.com/page/${pageNumber}/`;

  // Uso de Axios para obtener el contenido HTML de la página
  axios.get(url)
    .then(response => {
      const html = response.data; // Almacenamiento del HTML en una variable
      const $ = cheerio.load(html); // Uso de Cheerio para cargar el HTML y facilitar su manipulación
      const posts = []; // Array para almacenar los datos de cada post

      // Búsqueda de elementos que representan los posts y extracción de datos
      $('.post').each((index, element) => {
        const title = $(element).find('h2.entry-title').text().trim(); // Extracción del título del post
        const description = $(element).find('div.entry-content').text().trim(); // Extracción de la descripción
        const link = $(element).find('a').attr('href'); // Extracción del enlace del post

        // Añadiendo el post extraído al array de posts
        posts.push({
          title,
          description,
          link
        });
      });

      // Registro en consola de los datos extraídos
      console.log(`Datos de la página ${pageNumber}:`, posts);
      // Llamada a la función para guardar los datos en un archivo JSON
      saveData(posts, pageNumber);
    })
    .catch(console.error); // Captura de errores en el proceso de scraping
}

// Función para guardar los datos en un archivo JSON
function saveData(data, pageNumber) {
  // Creación o sobreescritura de un archivo para cada página con los datos en formato JSON
  fs.writeFile(`posts_pagina_${pageNumber}.json`, JSON.stringify(data, null, 2), err => {
    if (err) {
      // Si hay un error al escribir el archivo, se muestra un mensaje de error
      console.log('Error escribiendo archivo:', err);
    } else {
      // Confirmación en consola de que el archivo fue escrito correctamente
      console.log(`Publicación escrita posts_pagina_${pageNumber}.json escrita correctamente`);
    }
  });
}

// Función para manejar el scraping de múltiples páginas
function scrapeMultiplePages(startPage, endPage) {
  // Bucle para iterar sobre el rango de páginas especificadas
  for (let i = startPage; i <= endPage; i++) {
    // Llamada a la función scrapePage para cada página en el rango
    scrapePage(i);
  }
}

// Llamada a la función scrapeMultiplePages para iniciar el proceso de scraping en las páginas deseadas
scrapeMultiplePages(1, 4);  // Por ejemplo, para scrapear las páginas 2 y 3
