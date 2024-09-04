import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const galeria = sequelize.define('galeria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imagen: {
        type: DataTypes.STRING
    }
});