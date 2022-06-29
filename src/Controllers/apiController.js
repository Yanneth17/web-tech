const db = require ("../database/models")
const { Sequelize } = require('sequelize');

const ApiController ={
    lastUser: async (req,res) => {
        try {
            let users = await db.usuarios.findAll({
                
            })  
            const lastUser = users.pop()
            let lastUserImgUrl = lastUser.img_perfil

            let response = {
                lastUser: lastUser,
                lastUserImgUrl: `${req.protocol}://${req.get('host')}/img/users/${lastUserImgUrl}`
            }
            res.status(200).json({response})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg:"error"})
        }},

    lastProduct: async (req,res) => {
        try {
            let products = await db.productos.findAll({
                include: [{association:"categorias"}]
            })  
            const lastProduct = products.pop()
            let lastProductImgUrl = lastProduct.imagen

            let response = {
                lastProduct: lastProduct,
                lastProductImgUrl: `${req.protocol}://${req.get('host')}/img/${lastProductImgUrl}`
            }
            res.status(200).json({response})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg:"error"})
        }},

    users: async (req,res) => {
        try {
            const limit = 10
            const page = parseInt(req.query.page)
            const offset = page ? (page-1)* limit : 0
            let usersList = await db.usuarios.findAndCountAll({
                attributes: ["id", "nombre", "apellido", "email"],
               
                offset: offset,
                limit: limit,
            })

            const rows = usersList.rows.map(user => {
                const { dataValues } = user;
                const url = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}${user.id}`;
                return {
                    ...dataValues,
                    url
                }
            })
            const totalPages = Math.ceil(usersList.count / limit)

            let response = {
                totalPages: totalPages,
                currentPageNumber: page,
                count: usersList.count,
                users: rows,
            }
            res.status(200).json({response})     
        } catch (error) {
            console.log(error)
            res.status(500).json({msg:"error"})
        }
    },
    userDetail: async (req,res) => {
        try {
            let userDetail = await db.usuarios.findByPk(req.params.id, {attributes: {exclude:["password"]}})
            let userAvatarUrl = userDetail.img_perfil
            
            let response = {
                user: userDetail,
                userAvatarUrl: `${req.protocol}://${req.get('host')}/img/users/${userAvatarUrl}`
            }
            res.status(200).json({response})     
        } catch (error) {
            console.log(error)
            res.status(500).json({msg:"error"})
        }
    },
    products: async (req,res) => {
        try {
            const limit = 10
            const page = req.query.page
            const offset = page ? (page-1)* limit : 0
            let products = await db.productos.findAndCountAll({
                attributes: ["id", "nombre", "descripcion"],
                include: {association:"categorias"},
                offset: offset,
                limit: limit,
            })

            
            const rows = products.rows.map(product => {
                const { dataValues } = product;
                const url = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}/${product.id}`;
                return {
                    ...dataValues,
                    url
                }
            })
            
            let countByCategory = await db.productos.findAll({
                attributes: [
                    "categorias.id","categorias.nombre",
                    [db.Sequelize.fn("COUNT", db.Sequelize.col("categorias.id")), "count"],
                ],
                include: [{association:"categorias"}],
                group: ['categorias.id']
            })
        
            console.log(rows)
            const totalPages = Math.ceil(products.count / limit)
            let response = {
                totalPages: totalPages,
                currentPageNumber: page,
                count: products.count,
                countByCategory,
                products: rows
            }
                res.status(200).json({response})            
        } catch (error) {
            console.log(error)
            res.status(500).json({msg:"error"})
        }
    },
    productDetail: async (req,res) => {
        try {
            let productDetail = await db.productos.findByPk(req.params.id,{
                attributes: ["id","nombre","descripcion","inventario","precio","id_categoriaFK","imagen","id_marcaFK"],
                include: {association:"categorias"}
            })
            
            let productImgUrl = productDetail.imagen

            let response = {
                product: productDetail,
                productImgUrl: `${req.protocol}://${req.get('host')}/img/${productImgUrl}`
            }
            res.status(200).json({response})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg:"error"})
        }
    }
}
module.exports = ApiController;