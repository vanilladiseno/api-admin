import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { proyecto } from './proyecto.model.js';

export const cliente = sequelize.define('cliente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    }
});

cliente.hasMany(proyecto, {
    foreignKey: 'id_cliente',
    sourceKey: 'id'
});

proyecto.belongsTo(cliente , {
    foreignKey: 'id_cliente',
    targetId: 'id'
});