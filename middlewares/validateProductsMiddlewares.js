



//const path = require("path");
const { check } = require('express-validator');

const validatorProducts = [
    check('name').notEmpty().bail().withMessage('Debes completar el campo nombre del producto').isLength({ min: 1, max:100 }).withMessage('Nombre invalido, maximo 100 caracteres'),
    check('price').notEmpty().bail().withMessage('Debes agregar el precio del producto').isInt().withMessage('Este espacio solo permite numeros enteros, los precios no pueden contener decimales'),
    check('discount').isInt().withMessage('Agregar el descuento del producto, sin el porcentaje (%)'),
    check('inventory').isInt().withMessage('Debes colocar el número de unidades en stock del producto, solo se permiten números enteros'),
    check('category').notEmpty().bail().withMessage('Debes seleccionar la categoría'),
    check('mark').notEmpty().bail().withMessage('Debes seleccionar la marca'),
    check('description').notEmpty().bail().withMessage('Debes escribir la descripción del producto'),
]

module.exports = validatorProducts;