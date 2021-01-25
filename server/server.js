require('./config/config');

//esto es copia pega de lapagina de npm express
const express = require('express')
    //esto es un paquete nuevo npm
const bodyParser = require('body-parser')
    //app use son middlewares

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




app.get('/', function(req, res) {
    //res.send('Hello World')

    //podemos cambiar para mandar un Json
    res.json('Hello World');
})
app.get('/usuarios', function(req, res) {

    res.json('get usuario');
})
app.post('/usuarios', function(req, res) {


    let body = req.body;

    if (body.nombre === undefined) {

        res.status(400).json({
            ok: false,
            mensaje: "se necesita nombre"
        });
    }
    res.json({
        persona: body
    });
})
app.put('/usuarios/:id', function(req, res) {

    let id = req.params.id;
    res.json({
        id

    });
})
app.delete('/usuarios/:id', function(req, res) {

    let id = req.params.id;
    res.json('put usuario');
})

app.listen(process.env.PORT);