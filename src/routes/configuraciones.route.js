import {response, Router} from "express";
import validarToken from "../helpers/validate.jwt.js";

import {methods as configuracionesController} from "./../controllers/configuraciones.controller.js";

const router = Router();

router.post("/" , validarToken , configuracionesController.addConfiguracion);
router.post("/getconfig" , validarToken , configuracionesController.getConfiguracion);
router.get("/get_rutas_seo" , validarToken , configuracionesController.getRutas);
router.get("/get_rutas_seo_by_id/:id" , validarToken , configuracionesController.getRutasById);
router.put("/get_update_ruta_seo_by_id/:id" , validarToken , configuracionesController.getUpdateRutaById);
router.post("/get_data_seo_by_url" , validarToken , configuracionesController.getDataSeoByUrl);
router.post("/send_mail_contacto" , validarToken , configuracionesController.sendMailContacto);

export default router;