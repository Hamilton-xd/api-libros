const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Arreglo de libros en memoria (requisito de la actividad)
const libros = [
  { id: 1, nombre: 'Cien años de soledad', anio: 1967 },
  { id: 2, nombre: 'Don Quijote de la Mancha', anio: 1605 },
  { id: 3, nombre: 'El principito', anio: 1943 },
  { id: 4, nombre: '1984', anio: 1949 }
];

// 1. Listar todos los libros
app.get('/libros', (req, res) => {
  res.status(200).json(libros);
});

// 2. Buscar libros por nombre (?nombre=...)
app.get('/libros/buscar', (req, res) => {
  const { nombre } = req.query;
  
  if (!nombre) {
    return res.status(400).json({ error: 'Debes proporcionar el parámetro "nombre"' });
  }

  const resultados = libros.filter(l => 
    l.nombre.toLowerCase().includes(nombre.toLowerCase())
  );

  if (resultados.length === 0) {
    return res.status(404).json({ error: 'No se encontraron libros con ese nombre' });
  }

  res.status(200).json(resultados);
});

// 3. Obtener detalles de un libro por ID
app.get('/libros/:id', (req, res) => {
  const idLibro = parseInt(req.params.id);
  const libro = libros.find(l => l.id === idLibro);

  if (!libro) {
    return res.status(404).json({ error: `Libro con ID ${idLibro} no encontrado` });
  }

  res.status(200).json(libro);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor API ejecutándose en http://localhost:${PORT}`);
});