function especificacionesData(sequelize, Datatypes) {

    cols = {
        id: {type: Datatypes.INTEGER, primaryKey:true, autoIncrement: true},
        tipo: {type: Datatypes.STRING},
        valor: {type: Datatypes.STRING}
    };

    config = {camelCase:false, timestamps: false};

    const especificaciones = sequelize.define( 'especificaciones',cols,config)

    especificaciones.associate = function(modelos) {

        especificaciones.belongsToMany(modelos.productos, {
            as: "productos",
            through: "productos_especificaciones",   // tabla intermedia
            foreignKey: "id_especificacionFK",  // FK del modelo en el que estoy (en la tabla intermedia de la bd)
            otherKey: "id_productoFK",   // es el FK del otro modelo (en la tabla intermedia de la bd)
            timestamps: false
      });
    }

    return especificaciones;
}

module.exports = especificacionesData;
