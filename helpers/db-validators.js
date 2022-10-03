const Role = require('../models/rol');
const Usuario = require('../models/usuario');


const esRolValido = async(rol = '') =>{
    const existeRol = await Role.findOne({rol}); //el rol que estoy validando debe ser = al de la bds
    if(!existeRol){
          throw new Error('El rol es incorrecto'); //error personalizado, sera atrapado en el custom
    }
 }


const emailExiste = async(correo) =>{
    const existeEmail = await Usuario.findOne({correo});
  if(existeEmail){
    throw new Error('El email existe')
  }
}

const existeUsuarioPorId = async(id) =>{
  const existeUsuario = await Usuario.findById(id);
if(!existeUsuario){
  throw new Error('El id no existe')
}
}

 module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
 }