import { Router } from "express";
import { authSchema } from "@/schemas/auth.schemas";
import { playerSchema } from "@/schemas/player.schemas";
import { authController } from "@/controllers/auth.controllers";
import validateSchema from "@/middlewares/validateSchema";

const router = Router();

router.post("/api/sign-up", validateSchema(playerSchema), authController.signUp);
router.post("/api/sign-in", validateSchema(authSchema), authController.signIn);

export default router;