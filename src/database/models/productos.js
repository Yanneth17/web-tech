


function productosData(sequelize, Datatypes) {

    cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type:Datatypes.STRING},
        precio: {type: Datatypes.INTEGER},
        descuento: {type: Datatypes.INTEGER},
        inventario: {type: Datatypes.INTEGER},
        id_categoriaFK: {type: Datatypes.INTEGER},
        id_marcaFK: {type: Datatypes.INTEGER},
        descripcion: {type: Datatypes.STRING},
        imagen: {type: Datatypes.STRING},
    };

    config = {camelCase:false, timestamps: false};

    const productos = sequelize.define( 'productos',cols,config)

    productos.associate = function(modelos) {

        productos.belongsTo(modelos.categorias, {
            as: 'categorias',
            foreignKey: 'id_categoriaFK'
        });

        productos.belongsTo(modelos.marcas, {
            as: 'marcas',
            foreignKey: 'id_marcaFK'
        });

        productos.hasMany(modelos.ventas_usuarios_productos, {
            as: 'ventas_usuarios_productos',
            foreignKey: 'id_productoFK'  
        });

        productos.belongsToMany(modelos.especificaciones, {
            as: "especificaciones",
            through: "productos_especificaciones",   // tabla intermedia
            foreignKey: "id_productoFK",  // FK del modelo en el que estoy (en la tabla intermedia de la bd)
            otherKey: "id_especificacionFK",    // es el FK del otro modelo (en la tabla intermedia de la bd)
            timestamps: false
        }); 

    }

    return productos;
}

module.exports = productosData;