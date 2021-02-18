const { Router } = require('express');

// aqui creamos las rutas que trarean la info del controlador
//deconstruimos lo que viene del controlador para usarlo aqui
const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
} = require('../../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);





module.exports = router;