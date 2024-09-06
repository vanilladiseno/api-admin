import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { proyecto } from './proyecto.model.js';

export const alianza = sequelize.define('alianza', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    }
});

alianza.hasMany(proyecto, {
    foreignKey: 'id_alianza',
    sourceKey: 'id'
});

proyecto.belongsTo(alianza , {
    foreignKey: 'id_alianza',
    targetId: 'id'
});