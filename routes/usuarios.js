// ESTO ES COMO EL @Requestmapping, va el method http
//Esto expone los endpoint
//aqui no se hace nada con los argumentos, son solo rutas

const {Router} = require('express');
const {check} = require('express-validator');

const {usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch} = require('../controllers/usuarios.controller');

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarjWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const {
     validarCampos, validarjWT, tieneRole
} = require('../middlewares');

//const router = require('express').Router();

const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[
     check('id', 'No es un ID Válido').isMongoId(), //lee el segmento o param q se pide
     check('id').custom(existeUsuarioPorId),
     check('rol').custom(esRolValido), //no es obligatorio
     validarCampos //tiene que validar todos los campos
], usuariosPut);

//EL 2DO ARGUMENTO ES UN MIDDLEWARE (ALWAYS)
//si es uno se manda asi , shsdhgsh, si son varios se manda como un [ ]
router.post('/', [
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),  
     check('password', 'El password debe de ser mayor a 6 letras').isLength({min:6}),  
     check('correo', 'El correo no es válido').isEmail(), 
     check('correo').custom(emailExiste),
//      check('rol', 'No es un rol permitido').isIn(['ADMINISTRADOR', 'USUARIO']),  
     check('rol').custom(esRolValido),
//      check('rol').custom((rol) => esRolValido(rol)),
     validarCampos //quiero ejecutar la que va a realizar los errores
],  usuariosPost);

router.delete('/:id', [
     //Los middlewares se ejecutan de forma secuencial
     validarjWT,
     // esAdminRole, //fuerza a que el usuario sea admin
     tieneRole('ADMINISTRADOR', 'NOSE_ROL'),
     check('id', 'No es un ID Válido').isMongoId(),
     check('id').custom(existeUsuarioPorId),
     validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);



module.exports = router;