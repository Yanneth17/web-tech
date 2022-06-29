function categoriasData(sequelize, Datatypes) {

    cols = {
        id: {type: Datatypes.INTEGER, primaryKey:true, autoIncrement: true},
        nombre: {type: Datatypes.STRING(50)},
        id_departamentoFK: {type: Datatypes.INTEGER}
    };

    config = {camelCase:false, timestamps: false};

    const categorias = sequelize.define( 'categorias',cols,config)

    categorias.associate = function(modelos) {

        categorias.hasMany(modelos.productos, {
            as: 'productos',
            foreignKey: 'id_categoriaFK'  
        });

            categorias.belongsTo(modelos.departamentos, {
                as: 'departamentos',
                foreignKey: 'id_departamentoFK'
            });
    }

    return categorias;
}

module.exports = categoriasData;