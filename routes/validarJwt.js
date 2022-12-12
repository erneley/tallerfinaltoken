
const express = require('express');

//const {response,request}=requiere('express')
const jwt= require('jsonwebtoken');
require("dotenv").config();


const validarJwt= async (req,res, next)=>{

const token=req.headers['header'];
console.log( process.env.SECRET_KEY)
console.log( token)

if(!token){
    return res.status(400).send('credenciales incorrectas');
}

//if (token==process.env.SECRET_KEY){
//    return res.status(400).send('paso');
//}

return jwt.verify(token, process.env.SECRET_KEY, function(err) {
    if (err) {
        return res.json({
            success: false,
            message: "Failed to authenticate token.",
        });
    }
});
next()



next();


}



module.exports=validarJwt