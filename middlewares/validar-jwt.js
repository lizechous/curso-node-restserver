const jwt = require('jsonwebtoken');
//Para traer cosas de la bds debemos importar el modelo que corresponda
const Usuario = require('../models/usuario');

const validarjWT = async(req = req, res = response, next) => { // el middleware se dispara con 3 argumentos

    const token = req.header('x-token'); //como se especifique aqui el front lo debe enviar

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        //Sirve para verificar el token
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY); //pide el token y el secret or public key
    
        //leer el usuario que corresonde al uid que está arriba, para autenticar
        const usuario = await Usuario.findById(uid);

        if(!usuario){ //si usuario no existe
            return res.status(401).json({
                msg: 'usuario no existe en db'
            })
        }

        //con el uid me conecto a la bds 
        //  Verificar si el uid tiene estado true
        if(!usuario.estado){ 
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado false'
            })
        }
        
        req.usuario = usuario;
        
        next();//para que continue con los demas middleware

    } catch (error) {
        console.log('error');
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}


module.exports = {
    validarjWT
}

