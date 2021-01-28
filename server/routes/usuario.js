//esto es copia pega de lapagina de npm express
const express = require('express');


const bcrypt = require('bcrypt');
// para una whitelist de parametros que no deban ser actualizados //
const _ = require('underscore');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const Usuario = require('../models/usuario');

//app use son middlewares

const app = express();



app.get('/', function(req, res) {
    //res.send('Hello World')

    //podemos cambiar para mandar un Json
    res.json('Hello World');
})
app.get('/usuarios', function(req, res) {

    res.json('get usuario LOCAL');
})
app.post('/usuarios', function(req, res) {


    let body = req.body;

    let usuario = new Usuario({

        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role

    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    });



});
app.put('/usuarios/:id', function(req, res) {

    let id = req.params.id;
    res.json({
        id

    });
});
app.delete('/usuarios/:id', function(req, res) {

    let id = req.params.id;
    res.json('put usuario');
});


module.exports = app;