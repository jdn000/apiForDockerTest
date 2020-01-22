const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let userSchema = new Schema({
    nombre: {
        type: String,

    },   apPat: {
        type: String,

    },
    apMat: {
        type: String,

    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    rol: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    activado: {
        type: Boolean,
        default: true
    },
    rut: {
        type: String,
        unique: true,

    }
});
userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = mongoose.model('User', userSchema);