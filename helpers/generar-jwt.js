const jwt = require('jsonwebtoken');


const generarJWT = (uid = '') =>{ 
    //solo esto voy a conservar en el payload

    return new Promise((resolve, reject) =>{
        const payload = {uid}; //pueden ir varias cosas como nombre, etc

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token)  =>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolve(token);
            }
        }) //callback final
    })

}




module.exports = {
    generarJWT
}