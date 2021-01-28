require('./config/config');
require('./routes/usuario');

//esto es copia pega de lapagina de npm express
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

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//================================//
//    esto deberia estar en rutas //
//================================//

app.get('/', function(req, res) {
    //res.send('Hello World')

    //podemos cambiar para mandar un Json
    res.json('Hello World');
})
app.get('/usuario', function(req, res) {


    //si existe desde, usala y si no hara una paginacion desde el 0
    let desde = req.query.desde || 0;
    desde = Number(desde);

    //limite para paginacion   en postman se pone en get {{url}}/usuario?desde=x&limite=y
    let limite = req.query.desde || 5;
    limite = Number(limite);


    //para hacer get en la bbdd usuario.find  y .exe ejecuta el find

    //en el find puedes mandar los parametros a mostrar y entre parentesis un objeto para filtrar mas

    Usuario.find({ estado: true }, 'nombre email role') // <---encuentra todos los registros de la colección


    //para limitar registros
    .limit(desde)
        .skip(desde) // salta registros
        .exec((err, usuarios) => {

            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }

            //contar registros y mostrarlos
            Usuario.countDocuments({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });


            });



        })







    //res.json('get usuario LOCAL');
})
app.post('/usuario', function(req, res) {


    let body = req.body;

    let usuario = new Usuario({

        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role

    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        //usuarioDB.password = null;



        res.json({
            ok: true,
            usuario: usuarioDB
        })

    });



});

// el put es para actualizar en la bd
app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    //mandamos la whitelist como un array, lo que no añadamos no se puede hacer update
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    //mongoosejs.com en schema explica la funcion ///
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB

        });
    })
});
app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    let cambiaEstado = {
            estado: false
        }
        //despues del id hace falta el objeto que quiero actualizar
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        };
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'usuario no encontrado'
                }



            });


        }
        res.json({
            ok: true,
            usuario: usuarioBorrado

        });


    })
});

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