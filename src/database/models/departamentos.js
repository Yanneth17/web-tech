function departamentosData(sequelize, Datatypes) {

    cols = {
        id: {type: Datatypes.INTEGER, primaryKey:true, autoIncrement: true},
        nombre: {type: Datatypes.STRING(50)},
    };

    config = {camelCase:false, timestamps: false};

    const departamentos = sequelize.define( 'departamentos',cols,config)

    departamentos.associate = function(modelos) {

        departamentos.hasMany(modelos.categorias, {
            as: 'categorias',
            foreignKey: 'id_departamentoFK'  
        });
    }

    return departamentos;
}

module.exports = departamentosData;
