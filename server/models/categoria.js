const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({

    nombre: {

        type: String,
        required: [true, 'El nombre es necesario']
    },
    descripcion: {

        type: String,
        required: [true, 'La descripción es necesaria']
    },

    img: {
        type: String,
        required: false

    },

    estado: {
        type: Boolean,
        default: true
    },



});


//================Este código es un validador para que los cambios sean unicos====//

categoriaSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único'
});

//===============================================//



module.exports = mongoose.model('Categoria', categoriaSchema);