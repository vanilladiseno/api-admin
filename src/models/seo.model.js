import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';


export const seo = sequelize.define('seo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_pagina: {
        type: DataTypes.STRING
    },
    titulo: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    }
});
