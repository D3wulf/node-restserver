const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let roles_validos = {
    values: ['Admin_role', 'User_role'],
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({

    nombre: {

        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'El password es necesario']
    },
    img: {
        type: String,
        required: false

    },
    role: {
        type: String,
        default: 'User_role',
        enum: roles_validos

    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }


});
// esta funcion es por si no queremos que salga el campo password en el json cuando se envian usuarios.
usuarioSchema.methods.toJson = function() {

        let usar = this;
        let userObject = user.toObject();
        delete userObject.password;

        return userObject;

    }
    //=============================================//

//================Este código es un validador para que los cambios sean unicos====//

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único'
});

//===============================================//



module.exports = mongoose.model('Usuario', usuarioSchema);