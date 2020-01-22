const express= require('express');
const User=require('../models/user');
const bcrypt=require('bcrypt');
const { validate, clean, format } = require('rut.js')
module.exports ={

    createUser: async (req, res) => {
      let body = req.body;  
      try {
        let body = req.body;
        let run = clean(body.rut);
          let user = new User({
      
            nombre: body.nombre.toLowerCase(),
            apPat: body.apPat.toLowerCase(),
            apMat: body.apMat.toLowerCase(),
            rut: run,
            email: body.email.toLowerCase(),
            password: bcrypt.hashSync(body.password, 11),
            rol: body.rol,
            activado: body.activado,

          });

          let userDB = await user.save();
          return res.send({
            success: true,
            message: "Guardado con éxito",
            user: {
              nombre: userDB.nombre,
              apellidos: userDB.apPat + ' ' + userDB.apMat
            }
          });
    
        } catch (error) {
          return res.send({
            success: false,
            message: "No se pudo guardar",
            error
          });
        }
    
      },
      getUsers: async (req, res) => {

        try {
          let users = await User.find({},
              "nombre apPat apMat rut  activado rol ubicacion"
            )
            .where({
              activado: true
            })
            .exec()
          if (!users.length) {
            throw error;
          }
          return res.send({
            success: true,
            users
          });
        } catch (error) {
          return res.send({
            success: false,
            message: "No existen usuarios",
            error
          });
        }
    
      }

};