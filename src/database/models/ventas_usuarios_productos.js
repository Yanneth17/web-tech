function ventas_usuarios_productosData(sequelize, Datatypes) {

    cols = {
        id: {type: Datatypes.INTEGER, primaryKey:true, autoIncrement: true},
        id_facturaFK: {type: Datatypes.INTEGER},
        id_forma_de_pagoFK: {type: Datatypes.INTEGER},
        id_productoFK: {type: Datatypes.INTEGER},
        cantidad_producto: {type: Datatypes.INTEGER},
        id_usuarioFK: {type: Datatypes.INTEGER},
    };

    config = {tableName: 'ventas_usuarios_productos', camelCase:false, timestamps: false};

    const ventas_usuarios_productos = sequelize.define( 'ventas_usuarios_productos',cols,config)

    ventas_usuarios_productos.associate = function(modelos) {

        ventas_usuarios_productos.belongsTo(modelos.facturas, {
            as: 'facturas',
            foreignKey: 'id_facturaFK'
        });

        ventas_usuarios_productos.belongsTo(modelos.formas_de_pago, {
            as: 'formas_de_pago',
            foreignKey: 'id_forma_de_pagoFK'
        });

        ventas_usuarios_productos.belongsTo(modelos.productos, {
            as: 'productos',
            foreignKey: 'id_productoFK'
        });

        ventas_usuarios_productos.belongsTo(modelos.usuarios, {
            as: 'usuarios',
            foreignKey: 'id_usuarioFK'
        })

    }

    return ventas_usuarios_productos;
}

module.exports = ventas_usuarios_productosData;