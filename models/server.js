const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server{
    //Todas las propiedades del objecto se definen en el constructor, 
    //no afuera como en java.

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Conectar a bds
        this.conectarDB();

        //Middlewares --> funciones que siempre van a 
        //ejecutarse cuando levantemos el servidor
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    // aqui me puedo conectar a varias
    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'))
    }

    //Metodo de la ruta
    routes(){
        //middleware ruta
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    //metodo que escucha
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;