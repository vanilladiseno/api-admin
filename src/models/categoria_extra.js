import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { proyecto } from './proyecto.model.js';

export const categoria_extra = sequelize.define('categoria_extra', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    }
});

categoria_extra.hasMany(proyecto, {
    foreignKey: 'id_categoria_extra',
    sourceKey: 'id'
});

proyecto.belongsTo(categoria_extra , {
    foreignKey: 'id_categoria_extra',
    targetId: 'id'
});