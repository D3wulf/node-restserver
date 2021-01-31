const express = require('express');

const bcrypt = require('bcrypt');

//NPM DE CREACION DE TOKENS ver en la web el funcionamiento

const jwt = require('jsonwebtoken');

const app = express();

const Usuario = require('../models/usuario');

app.post('/login', (req, res) => {

    let body = req.body;
    Usuario.findOne({ // aqui la condicion , que email exista

        email: body.email
    }, (err, usuarioDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {

            return res.status(400).json({
                ok: false,
                error: {
                    message: '(usuario) o pass erroneos'
                }
            });


        }
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {

            return res.status(400).json({
                ok: false,
                error: {
                    message: 'usuario o (pass) erroneos'
                }
            });

        }

        //esto genera el token, hay que hacer login valido para que lo cree


        // en el postman usar el token en el headers
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });


        res.json({

            ok: true,
            usuario: usuarioDB,
            token
        });


    });



});

module.exports = app;