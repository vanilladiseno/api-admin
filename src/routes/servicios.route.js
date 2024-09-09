import {response, Router} from "express";
import validarToken from "../helpers/validate.jwt.js";

import {methods as serviciosController} from "./../controllers/servicios.controller.js";

const router = Router();

router.post("/" , validarToken , serviciosController.addService);
router.get("/" , validarToken , serviciosController.getService);
router.get("/:id" , validarToken , serviciosController.getServiceById);


export default router;