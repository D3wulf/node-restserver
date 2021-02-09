const express = require('express');

const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
const categoria = require('../models/categoria');

let app = express(); //<-- esto ya creara los getters


//creamos una variable que contacta con el modelo
let Categoria = require('../models/categoria');

app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
        .populate('')
        .sort('nombre')
        .exec((err, categoriaDB) => {

            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }


            if (!categoriaDB) {
                res.status(400).json({
                    ok: false,
                    message: " Aun no hay nada que mostrar"

                });
            }

            res.json({
                ok: true,
                categoria: categoriaDB
            });






        });



});


app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    //buscamos lo que pongamos en la id, nos dara un error o un resultado
    // que guardaremos en la variable categoriaDB
    categoria.findById(id, (err, categoriaDB) => {
        // marcamos dos errores, el fallo normal y el que ocurre cuando no existe
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            res.status(500).json({
                ok: false,
                message: "NO existe la categoría",
                err
            });
        }

        // y aqui la respuesta si va todo bien.
        res.json({
            ok: true,
            categoria: categoriaDB
        });



    })



});


app.post('/categoria', verificaToken, (req, res) => {

    // esto es como si fuera el cuerpo de un formulario
    // se escribe body porque es lo que se cogeria del cuerpo del html
    // y que a su vez es donde añadimos las cosas en el postman
    // el nombre: body.nombre seria como $nombre=$_GET['nombre'] en un formulario normal
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });


});


app.put('/categoria/:id', verificaToken, (req, res) => {


    // para saber el id
    let id = req.params.id;
    // requerimos el body
    let body = req.body;
    //lo que queremos modificar
    let categoriaDesc = {
        descripcion: body.descripcion
    };



    Categoria.findByIdAndUpdate(id, categoriaDesc, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }


        if (!categoriaDB) {
            res.status(400).json({
                ok: false,
                message: " Aun no hay nada que mostrar"

            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });



    });





});






app.delete('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;


    //despues del id hace falta el objeto que quiero actualizar
    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        //Usuario.findByIdAndRemove(id, (err, catBorrada) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        };
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'categoria no encontrada'
                }



            });


        }
        res.json({
            ok: true,
            message: 'Categoria Borrada'

        });

    });


});


module.exports = app;