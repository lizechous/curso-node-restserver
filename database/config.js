const mongoose = require('mongoose');

// Aqui van todas las conexiones, deben ser asincronas, en un bloque try catch
const dbConnection = async()=> {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('Base de datos online');
    } catch (error) {
        throw new Error('Error al iniciar la bd')
    }
}


module.exports = {
    dbConnection
}