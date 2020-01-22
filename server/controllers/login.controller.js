const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
module.exports = {

    signIn: async (req, res) => {
        let body = req.body;
        try {

            let userDB = await User.findOne({
                    email: body.email
                })
                .exec()
            if (!userDB) {
                throw error;
            }
            if (userDB.activado === false) {
                throw error
            }
            if (!bcrypt.compareSync(body.password, userDB.password)) {
                return res.status(503).send({
                    success: true,
                    message: 'Error, Usuario o contraseña incorrectos'
                });
            }
            let token = jwt.sign({
                user: userDB
            }, process.env.SEED, {
                expiresIn: process.env.CADUCIDAD_TOKEN
            });
            return res.send({
                success: true,
                message: `Bienvenido ${userDB.nombre+' '+ userDB.apPat}`,
                token
            });

        } catch (error) {
            return res.send({
                success: false,
                message: 'Error de ingreso',
                error
            });

        }
    },
    signOut: (req, res) => {
        return res.status(200).send({
            success: true,
            message: 'Saliste exitosamente',
        });
    }
};