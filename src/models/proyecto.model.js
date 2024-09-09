import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { galeria } from './galeria.model.js';

export const proyecto = sequelize.define('proyecto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    anio: {
        type: DataTypes.TEXT
    },
    ubicacion: {
        type: DataTypes.STRING
    },
    imagen:{
        type:DataTypes.STRING
    },
    destacado : {
        type: DataTypes.BOOLEAN
    },
    slug:{
        type:DataTypes.STRING
    },
});

proyecto.hasMany(galeria, {
    foreignKey: 'id_proyecto',
    sourceKey: 'id'
});

galeria.belongsTo(proyecto , {
    foreignKey: 'id_proyecto',
    targetId: 'id'
});