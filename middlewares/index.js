
//Va a buscar directamente al archivo como en html

const validaCampos = require('../middlewares/validar-campos');
const validajWT = require('../middlewares/validar-jwt');
const  validaRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validaCampos,
    ...validajWT,
    ...validaRoles,
}