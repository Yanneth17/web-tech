const { json } = require('express/lib/response');
const fs = require('fs');
const path = require("path");
const { validationResult } = require('express-validator');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db = require('../database/models');
const { fileURLToPath } = require('url');

const session = require('express-session');
const controlador=
{

    detalle_producto:(req, res)=>{
        
        //const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        db.productos.findAll({include:[{association: 'especificaciones'}, {association: 'marcas'}, {association: 'categorias'}]})
        .then((productos) => {

            let idProducto= req.params.id;
            let productoEncontrado=null
            let detalleProducto = [];
            for (producto of productos){
                
                if(producto.id==idProducto){

                    let rutaImg = "/img/"+ producto.imagen
                        let productoHome ={
                            id: producto.id,
                            nombre: producto.nombre,
                            precio: producto.precio,
                            imagen: rutaImg,
                            inventario: producto.inventario,
                            especificacion_tipo: producto.especificaciones.tipo,
                            especificacion_valor: producto.especificaciones.valor,
                        }
                    detalleProducto.push(productoHome);
                    productoEncontrado=producto;
                    break;
                     
                }
                
            }
            console.log(detalleProducto) 
            
            res.render("products/detalle_producto.ejs",{producto: productoEncontrado})
        })

    },

    // detalle_producto:(req, res)=>{
    //     let idProducto= req.params.nombre;
    //     let productoEncontrado=null

    //     for(let p of products ){
    //         if (p.id== idProducto){

    //             productoEncontrado=p;
    //             break;

    //         }
    //     }
    //     res.render("products/detalle_producto.ejs",{producto: productoEncontrado})
    // },

    editar_producto:(req, res)=>{
        
        
        db.productos.findAll({include:[{association: 'categorias'}, {association: 'marcas'}, {association: 'especificaciones'}]})
        .then((productos) => {
        let idProducto= req.params.id;
        let productoeditado=null
        let listaProductos = [];
        for(let producto of productos ){
            if (producto.id== idProducto){
                let rutaImg = "/img/"+ producto.imagen

                let productoeditado ={
                    nombre: producto.nombre,
                    descuento: producto.descuento,
                    marca: producto.marcas.nombre,
                    imagen: rutaImg,
                    
                    
                }
                //listaProductos.push(productoeditado);
                productoEncontrado=producto;
                break;

            }
        }

        console.log(productoEncontrado)
        res.render("products/editar_producto.ejs",{producto: productoEncontrado})
    })  
    },

    update:(req, res)=>{
    
        let productoseditado=req.body
        let idbuscado= req.params.id
    
            db.productos.update(
                {

                nombre:productoseditado.name,
                precio:productoseditado.price,
                price2:productoseditado.price2,
                descuento:productoseditado.discount,
                descripcion:productoseditado.descripcion,

                },
                
                {
                    where: {id: idbuscado}

                }

            ).then(()=>{

                res.redirect("/")

            })
    },
   

    // Redirección al formulario de crear un producto
    crear_producto:(req, res)=>{
        res.render("products/crear_producto.ejs")
        
    },

    // Acción de crear un producto
    create:(req, res)=>{
        const resultValidation = validationResult(req);
       //  return res.send(resultValidation);
        if ( resultValidation.isEmpty() ) {

            let nombreImagen = req.file.filename;

            db.productos.create({

                nombre : req.body.name,
                precio : req.body.price,
                descuento: req.body.discount,
                inventario : req.body.inventory,
                id_categoriaFK: req.body.category,
                id_marcaFK: req.body.mark,
                descripcion : req.body.description,
                imagen: nombreImagen

        });

        res.redirect("/")
        console.log(productoNuevo)
    
    }else{

        res.render("products/crear_producto.ejs", {errors: resultValidation.mapped(),
            oldData: {
                name : req.body.name,
                price : req.body.price,
                discount: req.body.discount,
                inventory : req.body.inventory,
                category: req.body.category,
                mark: req.body.mark,
                description : req.body.description,
            } 
        })
    }

        // idNuevo=0;

		// for (let s of products){
		// 	if (idNuevo<s.id){
		// 		idNuevo=s.id;
		// 	}
		// }

		// idNuevo++;

		// let nombreImagen = req.file.filename;
        
        // let productos=products
        // let idnuevo=products[productos.length-1].id+1

        // let productonuevo={
        // id : idnuevo,
        // name : req.body.name,
        // price : req.body.price,
        // price2 : req.body.price2,
        // discount: req.body.discount,
        // category: req.body.category,
        // description : req.body.description,
        // image: nombreImagen

        // }
        // productos.push(productonuevo)
        // fs.writeFileSync(productsFilePath,JSON.stringify(productos,null,' '))

    },

    //Vista de carro de compra
    carro_de_compras:(req, res)=>{
        res.render("products/carro_de_compras.ejs")
    },

   
        

       
   

    destroy:(req, res)=>{
    
        let productoseditado=req.body
        let idbuscado= req.params.id
    
            db.productos.destroy(
                
                {
                    where: {id: idbuscado}
                }

            ).then(()=>{

                res.redirect("/")

            })
        
    },

    //     // Delete - Borrar un producto
    // destroy : (req, res) => {
    //     let idProductoSeleccionado = req.params.id;
    //     let productoEncontrado=null;
    
    //     for (let p of products){
    //         if (p.id==idProductoSeleccionado){
    //             productoEncontrado=p;
    //             break;
    //             }
    //         }
    
    //         let productos2 = products.filter(function(e){
    //             return e.id!=productoEncontrado.id;
    //         })
    //         fs.unlinkSync(path.join(__dirname, '../../public/img', productoEncontrado.image));
    //         fs.writeFileSync(productsFilePath, JSON.stringify(productos2,null,' '));
    
    //         res.redirect("/");
    //     },

        // Vista de todos los productos 
    vitrina_productos:(req, res)=>{
        db.productos.findAll({include:[{association: 'categorias'}, {association: 'marcas'}, {association: 'especificaciones'}]})
        .then((productos) => {
            let listaProductos = [];

            for (producto of productos){

                let listaEspecificaciones=[];

				for (especificaciones of producto.especificaciones){
					listaEspecificaciones.push(especificaciones.tipo + ': ' + especificaciones.valor);
				}

                let rutaImg = "/img/"+ producto.imagen
                let productoPrueba ={
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    imagen: rutaImg,
                    descuento: producto.descuento,
                    marca: producto.marcas.nombre,
                    
                    especificaciones: listaEspecificaciones
                }

                listaProductos.push(productoPrueba);
            }
            res.render("products/vitrina_productos.ejs", {Allproductos: listaProductos})
        });   
    },

    vitrina_tv:(req, res)=>{
        db.productos.findAll({ 
            where: {
                id_categoriaFK: 1}
        })
        .then((productos) => {
            let listaProductos = [];

            for (producto of productos){

                let productoSelecionado ={
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    imagen: "/img/"+ producto.imagen,
                    descuento: producto.descuento,
                }
                listaProductos.push(productoSelecionado);
            }
            res.render("products/vitrina_categorias.ejs", {Allproductos: listaProductos})  
            console.log("Ver: ", listaProductos);
        });
    },

    vitrina_cel:(req, res)=>{
        db.productos.findAll({ 
            where: {
                id_categoriaFK: 2}
        })
        .then((productos) => {
            let listaProductos = [];

            for (producto of productos){

                let productoSelecionado ={
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    imagen: "/img/"+ producto.imagen,
                    descuento: producto.descuento,
                }
                listaProductos.push(productoSelecionado);
            }
            res.render("products/vitrina_categorias.ejs", {Allproductos: listaProductos})  
            // console.log("Ver: ", listaProductos);
        });
    }, 
    
    vitrina_computadoras:(req, res)=>{
        db.productos.findAll({ 
            where: {
                id_categoriaFK: 3}
        })
        .then((productos) => {
            let listaProductos = [];

            for (producto of productos){

                let productoSelecionado ={
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    imagen: "/img/"+ producto.imagen,
                    descuento: producto.descuento,
                }
                listaProductos.push(productoSelecionado);
            }
            res.render("products/vitrina_categorias.ejs", {Allproductos: listaProductos})  
            // console.log("Ver: ", listaProductos);
        });
    },  

    vitrina_videojuegos:(req, res)=>{
        db.productos.findAll({ 
            where: {
                id_categoriaFK: 10}
        })
        .then((productos) => {
            let listaProductos = [];

            for (producto of productos){

                let productoSelecionado ={
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    imagen: "/img/"+ producto.imagen,
                    descuento: producto.descuento,
                }
                listaProductos.push(productoSelecionado);
            }
            res.render("products/vitrina_categorias.ejs", {Allproductos: listaProductos})  
            // console.log("Ver: ", listaProductos);
        });
    },  

    vitrina_pcGamer:(req, res)=>{
        db.productos.findAll({ 
            where: {
                id_categoriaFK: 15}
        })
        .then((productos) => {
            let listaProductos = [];

            for (producto of productos){

                let productoSelecionado ={
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    imagen: "/img/"+ producto.imagen,
                    descuento: producto.descuento,
                }
                listaProductos.push(productoSelecionado);
            }
            res.render("products/vitrina_categorias.ejs", {Allproductos: listaProductos})  
            // console.log("Ver: ", listaProductos);
        });
    },  

    vitrina_audio:(req, res)=>{
        db.productos.findAll({ 
            where: {
                id_categoriaFK: 12}
        })
        .then((productos) => {
            let listaProductos = [];

            for (producto of productos){

                let productoSelecionado ={
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    imagen: "/img/"+ producto.imagen,
                    descuento: producto.descuento,
                }
                listaProductos.push(productoSelecionado);
            }
            res.render("products/vitrina_categorias.ejs", {Allproductos: listaProductos})  
            // console.log("Ver: ", listaProductos);
        });
    },  
    
};


module.exports=controlador