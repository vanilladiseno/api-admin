import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { proyecto } from './proyecto.model.js';

export const servicio = sequelize.define('servicio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    }
});

servicio.hasMany(proyecto, {
    foreignKey: 'id_servicio',
    sourceKey: 'id'
});

proyecto.belongsTo(servicio , {
    foreignKey: 'id_servicio',
    targetId: 'id'
});