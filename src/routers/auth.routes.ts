import { Router } from "express";
import { authSchema } from "@/schemas/auth.schemas";
import { playerSchema } from "@/schemas/player.schemas";
import validateSchema from "@/middlewares/validateSchema";
import authController from "@/controllers/auth.controllers";

const router = Router();

router.post("/api/sign-up", validateSchema(playerSchema), authController.signUp);
router.post("/api/sign-in", validateSchema(authSchema), authController.signIn);

export default router;