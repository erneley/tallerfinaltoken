const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const router = Router();
//require("dotenv").config();

const UsuarioSys = require('../models/auth');
const bcriptjs=require('bcryptjs');
const jwt= require('jsonwebtoken');
require("dotenv").config();

router.post('/registro', async (req,res)=>{


    try {
        const existeUsuario = await UsuarioSys.findOne({ email: req.body.email });
        if (existeUsuario) {
            return res.status(400).send('Email ya existe');
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        const usuarioSys=   new UsuarioSys(req.body)
       // const salt=bcriptjs.getSalt()
       // const password=
     const passwenc =   bcriptjs.hashSync(req.body.password,10)
   
    usuarioSys.nombre = req.body.nombre;
    usuarioSys.email = req.body.email;
    usuarioSys.estado = req.body.estado;
    usuarioSys.fechaCreacion = new Date();
    usuarioSys.fechaActualizacion = new Date();
    usuarioSys.password=passwenc;
    usuarioSys.rol=req.body.rol;
   
    console.log(usuarioSys);

    usuarioSys.save();

        res.send(usuario);
    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
    
    
        })





        router.post('/login', async (req,res)=>{
   //  console.log("assdaas")

const {email, password}=req.body
         try {
                const existeUsuario = await UsuarioSys.findOne({ email: req.body.email });
                if (!existeUsuario) {
                    return res.status(400).send('Email no existe');
                }

              /*if (existeUsuario.estado=="Inactivo") {
                    return res.status(400).send('Usuario desactivado');
                }*/

               

                if (!bcriptjs.compareSync(password, existeUsuario.password)) {
                    return res.status(400).send('contraseña incorrecta');
                  }
        
               const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ messages: errors.array() });
                }
        
              
        
            //res.send(existeUsuario);
             const payload= await{
                usuario: existeUsuario.email,
                nombre: existeUsuario.nombre,
                rol: existeUsuario.rol


             }

             
             var token = jwt.sign({ payload, expiresIn: "1h"},process.env.SECRET_KEY);
            
             return res.json({
                existeUsuario,
                token

             })
            } catch(error) {
                console.log(error);
                res.status(500).send('Ocurrio un error');
            }
            
            
                })
         


module.exports = router;