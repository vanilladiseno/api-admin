import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { categoria_extra } from './categoria_extra.js';

export const alianza = sequelize.define('alianza', {
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

alianza.hasMany(categoria_extra, {
    foreignKey: 'id_alianza',
    sourceKey: 'id'
});

categoria_extra.belongsTo(alianza , {
    foreignKey: 'id_alianza',
    targetId: 'id'
});