
import {response, Router} from "express";
import  upload from './../controllers/upload.controller.js';
import upload_multiple from "../controllers/upload-multiple.controller.js";
import validarToken from "../helpers/validate.jwt.js";

import {methods as proyectosController} from "./../controllers/proyectos.controller.js";

const router = Router();

router.post("/", validarToken , proyectosController.addProyecto);
router.get("/:nombre_alianza/:nombre_categoria/:proyectos_destacados" , proyectosController.getProyectos);
router.post("/insert_image_main", validarToken  , proyectosController.insertImageMain);
router.post("/insert_image_multiple", validarToken , proyectosController.insertImageMultiple);
router.get("/get_proyecto_by_slug/:slug" , proyectosController.getProyectoBySlug);
router.post("/get_proyectos" , proyectosController.getProyectoView);
router.get("/get_proyectos_by_id/:id" , proyectosController.getProyectoById);

router.post('/upload_file_main', upload.single('file'), (req, res) => {

    try {
      // Verifica si el archivo ha sido subido
      if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo' });
      }
      // Aquí puedes manejar la lógica adicional, como guardar la información en la base de datos
      res.status(200).json({
        message: 'Archivo subido con éxito',
        file: req.file
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al subir el archivo', error: error.message });
    }
  });


router.post('/upload_multiple', upload_multiple.array('files'), (req, res) => {

    try {
      res.status(200).json({
        message: 'Archivos subidos con éxito',
        files: req.files
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al subir los archivos', error: error.message });
    }
  });


export default router;