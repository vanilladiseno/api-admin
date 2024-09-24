import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';


export const configuracion = sequelize.define('configuraciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    meta_name: {
        type: DataTypes.STRING
    },
    meta_data: {
        type: DataTypes.STRING
    }
});
