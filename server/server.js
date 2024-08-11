const express = require("express");
const cors = require("cors")
const fs = require('fs'); //Modulo para escribir archivos

const app = express();
const corsOptions = {
    origin: "http://localhost:5173",
};

const usuarios = "data/usuarios.json";
const preguntas = "data/preguntas.json";

app.use(cors(corsOptions));
app.use(express.json()); 



// Ruta para manejar la creación de usuarios
app.post('/api/users', (req, res) => {
    const { name, score } = req.body;

    console.log(`Creating user with name: ${name} and score: ${score}`);

    // Si el archivo no existe, lo creas con un array vacío
    if (!fs.existsSync(usuarios)) {
        fs.writeFileSync(usuarios, JSON.stringify([]));
        console.log("Archivo creado");
    }

    // Leer los datos existentes
    let datos = LeerDatos(usuarios);

    // Agregar el nuevo usuario
    datos.unshift({ name, score });

    // Guardar el array completo nuevamente en el archivo
    fs.writeFileSync(usuarios, JSON.stringify(datos, null, 2));
    console.log("Se ha guardado el usuario");

    // Respuesta exitosa
    res.status(201).json({ message: 'User created successfully', user: { name, score } });
});

// Ruta para manejar consultas de preguntas
app.get('/api/questions', (req, res) => {
    // Leer los datos existentes
    let datos = LeerDatos(preguntas);
    // Enviar pregunas aleatorias
    preguntasAleatorias = seleccionarPreguntasAleatorias(datos, 10);
    // Respuesta exitosa
    res.status(200).json(preguntasAleatorias);
});

// Ruta para manejar consultas de historial
app.get('/api/history', (req, res) => { 
    // Leer los datos existentes
    let datos = LeerDatos(usuarios);
    // Respuesta exitosa
    res.status(200).json(datos);
});

// Funciones axiliares

let LeerDatos = function (archivo) {
    let rawdata = fs.readFileSync(archivo);
    let Datos = JSON.parse(rawdata);
    
    return Datos;
};

// Función para seleccionar 'n' elementos aleatorios de un array
function seleccionarPreguntasAleatorias(array, n) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, n);
}

app.listen(8080, () => {
    console.log("Server started on port 8080");
})