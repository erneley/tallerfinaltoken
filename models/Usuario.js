const { Schema, model } = require('mongoose');
//const add="1";

const usuarioschema=()=>{
const schema=Schema({
    nombre: {
        type: String,
        required: true, // not null
    },
    email: {
        type: String, required: true, unique: true,
    },
    estado: {
        type: String,
        required: true, enum: [ 'Activo', 'Inactivo' ]
    },
    fechaCreacion: {
        type: Date,
        required: true,
    },
    fechaActualizacion: {
        type: Date,
        required: true,
    }
});

    
    return schema;

}





const UsuarioSchema = usuarioschema();

module.exports =model('Usuario', UsuarioSchema)




