const { Schema, model } = require('mongoose');


const usuariossyschema=()=>{
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
           required: true
       },

           password:{
               type: String,
               required:[true, 'Password requerido']
           },
           rol: {
               type: String,
               required: true,
               enum: ['ADMIN', 'DOCENTE']
           }    
       });
   
      
       return schema;
   
   }


   const UsuarioSysSchema=usuariossyschema()
   module.exports = model('UsuarioSys', UsuarioSysSchema)