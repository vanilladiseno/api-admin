import {response, Router} from "express";
import validarToken from "../helpers/validate.jwt.js";

import {methods as authController} from "./../controllers/auth.controller.js";

const router = Router();

router.post("/"  , authController.authLogin);
router.get("/validar_token" , validarToken , authController.validar);

export default router;