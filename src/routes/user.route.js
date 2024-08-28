import {response, Router} from "express";

import {methods as userController} from "./../controllers/user.controller.js";

const router = Router();

router.post("/"  , userController.registerUser);

export default router;