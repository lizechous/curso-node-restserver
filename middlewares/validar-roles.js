const { response } = require("express");

const esAdminRole = (req, res = response, next) => {
   if(!req.usuario){ //si retorna un undefined
    return res.status(500).json({
        msg: 'Se quiere verificar el role sin validar el token primero'
    })
   }
    const {rol, nombre} = req.usuario;

    if(rol !== 'ADMINISTRADOR'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - no pude realziar tal acción`
        })
    }

    next();
}


const tieneRole = (...roles) => { // ... operador rest, para recibir muchos args, lo transforma en arreglos
    //debe retornar una función q se ejecuta coon lo q necesita un middleware
    return(req, res = response, next) =>{

        if(!req.usuario){ //si retorna un undefined
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if(!roles.includes(req.usuario.rol)){ //si el rol del usuario no esta incluido en los q se pide
            return res.status(500).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }

        next();
    }
}

module.exports={
    esAdminRole,
    tieneRole

}