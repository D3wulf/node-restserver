const express = require('express');

const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');


let app = express(); //<-- esto ya creara los getters


//creamos una variable que contacta con el modelo
let Producto = require('../models/producto');

app.get('/productos', verificaToken, (req, res) => {

    // PAGINACION
    //si existe desde, usala y si no hara una paginacion desde el 0
    let desde = req.query.desde || 0;
    desde = Number(desde);

    //limite para paginacion   en postman se pone en get {{url}}/usuario?desde=x&limite=y
    let limite = req.query.desde || 5;
    limite = Number(limite);


    Producto.find({})
        //para limitar registros
        .limit(5)
        .skip(desde) // salta registros
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .sort('nombre')
        .exec((err, productoDB) => {

            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }


            if (!productoDB) {
                res.status(400).json({
                    ok: false,
                    message: " Aun no hay nada que mostrar"

                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });

        });

});


// ==============================
//      BUSCAR PRODUCTOS
//===============================

app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    // el i hace insensible a mayus o minus
    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })

    .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, productos) => {

            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({


                ok: true,
                productos
            })

        });





});

app.get('/productos/:id', (req, res) => {

    let id = req.params.id;
    Producto.findById(id)

    .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {


            // marcamos dos errores, el fallo normal y el que ocurre cuando no existe
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }
            if (!productoDB) {
                res.status(500).json({
                    ok: false,
                    message: "NO existe la categoría",
                    err
                });
            }

            // y aqui la respuesta si va todo bien.
            res.json({
                ok: true,
                producto: productoDB
            });



        });





});


app.post('/productos', verificaToken, (req, res) => {

    let body = req.body;
    //necesario crear una instancia de Producto
    let producto = new Producto({

        //el usuario no funcionara si no tenemos el verifica token
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        producto: body.producto




    });

    producto.save((err, nuevoProd) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: nuevoProd
        });
    });

});

app.put('/productos/:id', verificaToken, (req, res) => {


    // para saber el id
    let id = req.params.id;
    // requerimos el body porque vamos a actualizar
    let body = req.body;
    //lo que queremos modificar
    let productoPUT = {

        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,

    };

    /*otra forma seria con 
    Producto.findById(id, (err,productoDB)=>{

        los errores irian aquí

        productoDB.nombre= body.nombre;
        productoDB.precioUni= body.precioUni;
        productoDB.producto= body.producto;
         y asi todas

        despues
        productoDb.save( (err,productoGuardado)=>{

            los errores aqui y la respuesta
        })
    })*/



    Producto.findByIdAndUpdate(id, productoPUT, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }


        if (!productoDB) {
            res.status(400).json({
                ok: false,
                message: " Aun no hay nada que mostrar"

            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });



    });





});



app.delete('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;


    //despues del id hace falta el objeto que quiero actualizar
    Producto.findById(id, (err, productoDB) => {
        //Usuario.findByIdAndRemove(id, (err, catBorrada) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        };
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'producto no encontrado'
                }



            });


        }
        //resultado si logra encontrar el producto

        productoDB.disponible = false;
        productoDB.save((err, productoDel) => {


            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            };




            res.json({
                ok: true,
                producto: productoDel,
                message: "Producto cambiado a false"

            });

        });



    })



});

module.exports = app;