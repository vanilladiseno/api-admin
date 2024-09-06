import {response, Router} from "express";
import validarToken from "../helpers/validate.jwt.js";

import {methods as alianzaController} from "./../controllers/alianza.controller.js";

const router = Router();

router.get("/" , validarToken , alianzaController.getAlianzas);


export default router;