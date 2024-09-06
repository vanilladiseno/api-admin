import {response, Router} from "express";
import validarToken from "../helpers/validate.jwt.js";

import {methods as clientesController} from "./../controllers/clientes.controller.js";

const router = Router();

router.post("/" , validarToken , clientesController.addCliente);
router.get("/" , validarToken , clientesController.getClientes);
router.post("/add_logo_cliente" , validarToken , clientesController.addLogoCliente);

export default router;