
const fs = require('fs');
const path = require("path");

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const db = require('../database/models');

const controlador=
{
    // Redirección al formulario de creación de registro
    register:(req, res)=>{
        res.render("users/register")
    },

    // Procesamiento de creación de registro   
    nuevoUsuario:(req, res)=>{
         const resultValidation = validationResult(req);
              if ( resultValidation.isEmpty() ) {

                let password = req.body.password;

            db.usuarios.create({
                    nombre : req.body.nombres,
                    apellido : req.body.apellidos,
                    tipo_documento : req.body.tipo_documento,
                    dni: req.body.dni,
                    dia: req.body.days,
                    mes: req.body.months,
                    year: req.body.years,
                    email : req.body.email,
                    telefono: req.body.tel,
                    direccion: req.body.dir,
                    contrasena : bcryptjs.hashSync(password, 8),
                    img_perfil: req.file.filename
            }); 

            
            db.usuarios.max('id')
               .then((resultado) => {
                   a = resultado,
                   b = 1,
                console.log(a + b)
                let idNuevo = a + b
                res.redirect('/users/mi_cuenta/'+ idNuevo)
               });
            
         } else {
            res.render("users/register.ejs", {errors: resultValidation.mapped(),
                oldData: {
                    nombres : req.body.nombres,
                    apellidos : req.body.apellidos,
                    tipo_documento : req.body.tipo_documento,
                    dni: req.body.dni,
                    days: req.body.days,
                    months: req.body.months,
                    years: req.body.years,
                    email : req.body.email,
                    tel: req.body.tel,
                    dir: req.body.dir,
                    }
                })
            }
    },

    //vista de cuenta de usuario
   mi_cuenta:(req, res)=>{

        let idPerfil= req.params.id;

         db.usuarios.findAll({
             where: {
                 id : idPerfil
             }
        }).then(usuarioSeleccionado=> {
                res.render("users/mi_cuenta.ejs", {usuarios: usuarioSeleccionado[0]})
            });
    },

    // Redirección al formulario de editar usuario
    editar_perfil:(req, res)=>{
        
        let idPerfilSeleccionado= req.params.id;
       
        db.usuarios.findAll({
                where: { 
                    id : idPerfilSeleccionado
                    } 
                })
            .then((usuarioEncontrado) => {
                console.log(usuarioEncontrado[0].year);
            res.render("users/editar_perfil.ejs",{usuarios: usuarioEncontrado[0]})
        });
    },

    //Acción de Edición de usuario
   update:(req, res)=>{
   
        let id_modificado= req.params.id;
        let perfilActualizacion = req.body;

         db.usuarios.update(
             {   nombre: perfilActualizacion.nombres,
                 apellido: perfilActualizacion.apellidos,
                 tipo_documento: perfilActualizacion.tipo_documento,
                 dni: perfilActualizacion.dni,
                 dia: perfilActualizacion.days,
                 mes: perfilActualizacion.months,
                 year: perfilActualizacion.years,
                 email: perfilActualizacion.email,
                 telefono: perfilActualizacion.tel,
                 direccion: perfilActualizacion.dir,
                 contrasena: perfilActualizacion.password
             },
            { where: {id: id_modificado}}
         ).then(()=> res.redirect("/users/mi_cuenta/" + id_modificado))
   },

   // Delete - Borrar un perfil
    destroy : (req, res) => {
        let idPerfilSeleccionado = req.params.id;
        
        db.usuarios.destroy({
            where: {id : idPerfilSeleccionado}
            }).then(()=> res.redirect("/")
        )
    },

    login:(req, res)=>{
        res.render("users/login")
    },

    ingresoLogin:(req, res) =>{
        
        let emailToLogin = req.body.email;
        let passwordToLogin = req.body.password;
        db.usuarios.findAll({

                 where: {
                     email: emailToLogin,
                     
                 }

        

             }).then((usuarios) => {

            let usuarioLogin = [];

                for (usuario of usuarios){
                    let usuarioLogeado ={
                        id: usuario.id,
                        contrasena: usuario.contrasena,
                    }
                    usuarioLogin.push(usuarioLogeado);
                }

            let igualContrasena= bcryptjs.compareSync(passwordToLogin, usuarioLogin[0].contrasena);
            
                if (igualContrasena){
                    res.redirect("/users/mi_cuenta/"+ usuarioLogin[0].id);
                } else {res.send('Datos Invalidos')}
        });
   
    //     for(let u of usuarios ){
    //           if (u.email == emailToLogin){
    //             let idLogueado = u.id
    //             let igualContraseña = bcryptjs.compareSync(passwordToLogin, u.password);
    //                      if(igualContraseña) {
    //                         res.redirect("/users/mi_cuenta/"+ idLogueado);
    //                       } else {res.send('Datos Invalidos')}
                          
    //                   }                 
    //              }
    // }
    }
}

module.exports=controlador