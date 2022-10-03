const{response} = require('express');
const Usuario = require('../models/usuario'); //es como importar el usuario de java
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response) => {



    const {correo, password} = req.body;

    try { //por si algo sale mal

        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo}); //las llaves son xq recibe vaios params
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos'
            });
        }

        //Si el usuario está activo 
        if(usuario.estado === false){// or !usuario.estado
            return res.status(400).json({
                msg: 'Usuario / password no son correctos, estado: false'
            });
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password); 
                        //compara si hace mach con el de la bds, regresa un boolean
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos- password'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);
        //es un callback y hay que tranformar a promesas

        //solo puede haber 1 res json en el flujo
        res.json({
            usuario,
            token
        })
        
    } catch (error) { //es para que la app no se caiga
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login
}