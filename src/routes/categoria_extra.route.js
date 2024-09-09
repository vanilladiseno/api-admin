import {response, Router} from "express";
import validarToken from "../helpers/validate.jwt.js";

import {methods as categoriaExtraController} from "./../controllers/categoria_extra.controller.js";

const router = Router();

router.get("/:id" , validarToken , categoriaExtraController.getCategoriaExtra);


export default router;