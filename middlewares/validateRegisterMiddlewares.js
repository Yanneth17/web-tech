const path = require("path");
const { check } = require('express-validator');

const validatorRegister =[
    check('nombres').notEmpty().bail().withMessage('Debes completar el campo Nombre(s)').isLength({ min: 2, max:30 }).withMessage('Nombre invalido'),
	check('apellidos').notEmpty().withMessage('Debes completar el campo Apellidos'),
    check('dni').notEmpty().bail().withMessage('Digita tu identificación'),
	check('email').notEmpty().bail().withMessage('Debes completar el campo Email').isEmail().withMessage('Correo electronico invalido, no debes incluir el simbolo "ñ"'),
    //check('tel').isInt().withMessage('Digita tu número de celular'),
    check('password').notEmpty().bail().withMessage('Debes completar el campo de Contraseña').isStrongPassword([ minLength= 4, maxLength= 15, minLowercase= 1, minUppercase= 1, minNumbers= 1, minSymbols= 1 ]).withMessage('"La contraseña debe contener mayúsculas, minúsculas, minimo un carácter especial y un dígito."'),
    check('password2').notEmpty().bail().withMessage('Debes verificación tu contraseña').isStrongPassword([ minLength= 4, maxLength= 15, minLowercase= 1, minUppercase= 1, minNumbers= 1, minSymbols= 1 ]).withMessage('"La contraseña debe ser una combinación de una mayúscula, una minúscula, un carácter especial, un dígito y un mínimo de 6, un máximo de 15 caracteres de largo"'),
    check('img_perfil').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png'];
        
                if (!file) {
                    throw new Error('Tienes que subir una imagen');
                } else {
                    let fileExtensions = path.extname(file.originalname);
                    if (!acceptedExtensions.includes(fileExtensions)) {
                        throw new Error('Las extensiones permitidas son jpg, png');
                    }       
                }
             return true;
        }),
]

module.exports=validatorRegister;