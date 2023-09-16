import { Router } from "express";
import validateAuth from "@/middlewares/validateAuth";
import validateSchema from "@/middlewares/validateSchema";
import { playerSchema } from "@/schemas/player.schemas";
import playerController from "@/controllers/player.controllers";

const router = Router();

router.put("/api/players", validateAuth, validateSchema(playerSchema), playerController.update);
router.delete("/api/players", validateAuth, playerController.deleteById);

export default router;