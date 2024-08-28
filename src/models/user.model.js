import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const user = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    fecha_nacimiento: {
        type: DataTypes.DATE
    },
    telefono: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    },
    code_recovery: {
        type: DataTypes.STRING
    }
});