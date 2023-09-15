import { Router } from "express";
import { playerSchema } from "@/schemas/player.schemas";
import { playerController } from "@/controllers/player.controllers";
import validateSchema from "@/middlewares/validateSchema";
import validateAuth from "@/middlewares/validateAuth";

const router = Router();

router.put("/api/players/:id", validateAuth, validateSchema(playerSchema), playerController.update);
router.delete("/api/players/:id", validateAuth, playerController.deleteById);

export default router;