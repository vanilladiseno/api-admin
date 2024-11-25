import {response, Router} from "express";
import validarToken from "../helpers/validate.jwt.js";

import {methods as categoriaExtraController} from "./../controllers/categoria_extra.controller.js";

const router = Router();

router.get("/:id" , validarToken , categoriaExtraController.getCategoriaExtra);
router.get("/get_proyectos_by_slug_categoria/:slug" , validarToken , categoriaExtraController.getProyectosBySlugCategoria);


export default router;