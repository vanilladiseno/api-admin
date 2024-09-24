import app from "./app.js";
import { sequelize } from "./database/database.js";

import './models/user.model.js';
import './models/cliente.model.js';
import './models/servicio.model.js';
import './models/alianza.model.js';
import './models/categoria_extra.js';
import './models/proyecto.model.js';
import './models/galeria.model.js';
import './models/configuraciones.model.js';
import './models/seo.model.js';

const main=async ()=>{
    try {
        //await sequelize.sync({alter: true});
        await sequelize.authenticate();
        console.log("Connection api-admin has been established successfully.");
        app.listen(app.get("port"));
        console.log(`Server on port ${app.get("port")}`);
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

main();