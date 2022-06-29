const fs = require('fs');
const path = require("path");

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db = require('../database/models');
const controlador=
{
    

    home:(req, res)=>{
        //const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        db.productos.findAll()
        .then((productos) => {
            let listaProductos = [];
            for (producto of productos){
                
                let rutaImg = "/img/"+ producto.imagen
                let productohome ={
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    imagen: rutaImg,
                    descuento: producto.descuento,
                    imagen: rutaImg,
                    
                }

                listaProductos.push(productohome);
    
            }
            
            console.log(listaProductos)


        res.render("main/home.ejs", {Allproductos: listaProductos})
    })

  
}
}

module.exports=controlador