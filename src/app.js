import express from "express";
import cors from "cors";
import path from 'path';
import bodyParser from "body-parser";
import { config } from "dotenv";

import { fileURLToPath } from 'url';
config();

//Routes import
import authRoute from "./routes/auth.route.js";
import registerRoute from "./routes/user.route.js";
import servicioRoute from "./routes/servicios.route.js";
import clienteRoute from "./routes/clientes.route.js";
import proyectoRoute from "./routes/proyectos.router.js";
import alianzaRoute from "./routes/alianza.route.js";
import categoriaExtraRoute from "./routes/categoria_extra.route.js";

const app = express();

//settings
app.set("port" , process.env.PORT);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middlewares

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads_gallery', express.static(path.join(__dirname, 'uploads_gallery')));

//Routes
app.use("/api/auth" , authRoute);
app.use("/api/register" , registerRoute);
app.use("/api/servicio" , servicioRoute);
app.use("/api/cliente" , clienteRoute);
app.use("/api/proyecto" , proyectoRoute);
app.use("/api/alianza" , alianzaRoute);
app.use("/api/categoria_extra" , categoriaExtraRoute);

export default app;