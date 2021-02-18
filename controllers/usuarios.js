const { response, request } = require('express');

//aqui se crean todas las rutas
const usuariosGet = (req = request, res = response) => {

    //desesctructuramos unos datos que mandamos en la barra de direcciones
    // localhost:8080/api/usuarios?q=hola&apikey=xxx&nombre=loquesea
    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPost = (req, res = response) => {

    // lo que se que venga en el body lo recibire en dos constantes
    //recibire lo que pida del body
    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API - usuariosPost',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {
    //esto seria la req o request, en las rutas /:id ya lo pedimos
    const { id } = req.params;

    res.json({
        msg: 'put API - usuariosPut',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}