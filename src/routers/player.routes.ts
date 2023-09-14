import { Router } from "express";
import { playerSchema } from "@/schemas/player.schemas";
import { playerController } from "@/controllers/player.controllers";
import validateSchema from "@/middlewares/validateSchema";

const router = Router();

router.post("/api/players", validateSchema(playerSchema), playerController.create);

export default router;