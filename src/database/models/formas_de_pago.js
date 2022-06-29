function formas_de_pagoData(sequelize, Datatypes) {

    cols = {
        id: {type: Datatypes.INTEGER, primaryKey:true, autoIncrement: true},
        nombre: {type: Datatypes.STRING(100)},
    };

    config = {tableName: 'formas_de_pago', camelCase:false, timestamps: false};

    const formas_de_pago = sequelize.define( 'formas_de_pago',cols,config)

    formas_de_pago.associate = function(modelos) {
        formas_de_pago.hasMany(modelos.ventas_usuarios_productos, {
            as: 'ventas_usuarios_productos',
            foreignKey: 'id_forma_de_pagoFK'  
        })
    }

    return formas_de_pago;
}

module.exports = formas_de_pagoData;