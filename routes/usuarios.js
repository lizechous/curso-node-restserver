// ESTO ES COMO EL @Requestmapping, va el method http
//Esto expone los endpoint
//aqui no se hace nada con los argumentos, son solo rutas

const {Router} = require('express');
const {usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch} = require('../controllers/usuarios.controller');
//const router = require('express').Router();

const router = Router();

router.get('/', usuariosGet);

router.put('/:idUsuario', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);



module.exports = router;