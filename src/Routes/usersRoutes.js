const usersController= require("../Controllers/usersController")

const express=require("express")
const router= express.Router()

const uploadFile = require('../../middlewares/multerRegisterMiddlewares')
const validatorRegister = require('../../middlewares/validateRegisterMiddlewares')

// Redirecciona al formulario de creación de registro
router.get("/register",usersController.register)
// Procesamiento de creación de registro
router.post("/nuevousuario", uploadFile.single("img_perfil"), validatorRegister, usersController.nuevoUsuario)

// Cuenta de un usuario
router.get("/mi_cuenta/:id",usersController.mi_cuenta)

// Rutas para editar perfil
router.get("/editar_perfil/:id",usersController.editar_perfil)
router.put("/editar_perfil/:id",usersController.update)

 /*** ENRUTADOR PARA BORRAR UN PERFIL***/ 
router.delete('/delete/:id', usersController.destroy);

// Redirecciona a login
router.get("/login",usersController.login)
// Procesamiento de ingreso a login
router.post("/ingresoLogin", usersController.ingresoLogin)

module.exports=router