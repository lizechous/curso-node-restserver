// Controller, aqui le paso los parametros

const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario'); 
//La U mayuscula va a permitir crear instancias, es una estandar

const usuariosGet = async(req, res = response) => {
    
  // const {q, nombre = "No name", apikey, limit, page = 1} = req.query; //o req.params;
  const {limite = 5, desde = 0 } = req.query;
  const query = {estado: true};

  // const usuarios = await Usuario.find(query)
  //const usuarios = await Usuario.find({estado: true}) //aqui le podemos mandar condiciones
    // .limit(Number(limite)) //cuando le pasamos el params, viene en string asi que hay que parsearlo
    // .skip(desde);

  // const total = await Usuario.countDocuments(query); //nos sirve para hacer nuesttra paginacion

  const [total, usuarios] = await Promise.all([ //puedo usar desestructuracion 
    Usuario.countDocuments(query),
    await Usuario.find(query)
    .limit(Number(limite))
    .skip(desde)
  ])
  
  res.json({
      //resp
       total,
       usuarios,
      // q,
      // nombre,
      // apikey
    });
  }

const usuariosPost = async(req, res) => { //sin el async igual funca :S

  // const body = req.body;
  const {nombre, correo, password, rol} = req.body;
  // const {google, ...resto} = req.body; //para sacar un campo especifico
  // const usuario = new Usuario(resto);
  const usuario = new Usuario({nombre, correo, password, rol}); //nueva instancia
  //Si le enviamos un campo que no está definido, lo va a ignorar

  //VERIFICAR SI EL CORREO EXISTE****************
  

  //ENCRIPTAR LA CONTRASEÑA*********
  const salt = bcryptjs.genSaltSync();//por default 10
  //salt: definir q tan complicada va a ser la autenticacion
  usuario.password = bcryptjs.hashSync(password, salt);

  //GUARDAR EN LA BD***************
  await usuario.save();

  res.json({ //respuesta
      msg: 'post api',
      usuario
  });
}

  const usuariosPut = async(req, res) => {

    // const id = req.params.idUsuario;
    const {id} = req.params;
    const{ _id, password, google, correo, ...resto} = req.body;

    //TODO validar contra bds
    if(password){ //si viene el password en el req
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuarioPut = await Usuario.findByIdAndUpdate(id, resto, {new: true}); //actualizo el resto

    res.json(usuarioPut);
  }

  const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch api - controller'
    })
    }

  const usuariosDelete =  async(req, res) => {

    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false},  {new:true});
    // const usuarioAutenticado = req.usuario; //el user autenticado es el q se encuentra en el request

    res.json(usuario);
    };

  module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
  }