// Controller, aqui le paso los parametros

const {response, request} = require('express');


const usuariosGet = (req, res = response) => {
    
  const {q, nombre = "No name", apikey, limit, page = 1} = req.query; //o req.params;
  
  res.json({
        msg: 'get api - controlador',
        q,
        nombre,
        apikey
    });
  }

  const usuariosPost = (req, res) => {
    
    // const body = req.body;
    const {nombre, edad} = req.body;

    res.json({ //respuesta
        msg: 'post api',
        // body
        nombre,
        edad
        //ignorará los demás params si no se ponen aqui
    });
  }

  const usuariosPut = (req, res) => {

    const id = req.params.idUsuario;
    // const {idUsuario, nombre} = req.params;

    res.json({
        msg: 'put api - controller',
        id
    });
  }
  const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch api - controller'
    })
    }

  const usuariosDelete =  (req, res) => {
    res.json({
        msg: 'delete api - controller'
    })
    };

  module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
  }