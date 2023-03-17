
const mongoose  = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    rol: {
        type: String,
        emun: ['admin', 'usuario'],
        default:'USER_ROLE',
        
    },
    estado: {
        type: Boolean,
        default: true
    }
});


module.exports = mongoose.model('User', UsuarioSchema);
