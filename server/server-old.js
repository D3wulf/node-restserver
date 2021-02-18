require('./config/config');


//esto es copia pega de la pagina de npm express
const express = require('express');
//esto es un paquete nuevo npm

// Using Node.js `require()`
const mongoose = require('mongoose');

// para una whitelist de parametros que no deban ser actualizados //
const _ = require('underscore');

const bodyParser = require('body-parser');
//app use son middlewares

const app = express();

//esto deberia estar en usuario de las rutas//



const Usuario = require('./models/usuario');


const bcrypt = require('bcrypt');

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/index'));


// HABILITAR LA CARPETA PUBLIC
//hay que usar un middleware de express
const path = require('path');
// AUN ASI NO VA A FUNCIONAAR HAY QUE AÑADIR UN PATH
//app.use(express.static(__dirname + '../public')); <-- asi no funcionaria
// el path resolve ayuda a que se genere bien el path
app.use(express.static(path.resolve(__dirname, '../public')));





mongoose.connect(process.env.URLDB, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,



});


app.listen(process.env.PORT, () => {

        console.log("Puerto ready");
    }

);