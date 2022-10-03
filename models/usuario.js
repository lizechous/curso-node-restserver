
const {Schema, model} = require('mongoose');

//Creamos nuestro modelo
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'] //lo 2do no es necesario
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        // enum: ['ADMINISTRADOR', 'USUARIO']
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },

});

UsuarioSchema.methods.toJSON = function(){ //hace referencia a la isntancia creada
    const {__v, password, _id,...usuario} = this.toObject();
    usuario.uid = _id;
    // usuario.name = nombre; //puede ser con cualquier campo
    //estoy sacando la version y el pass y todo lo demas sera almacenado en usuario
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);