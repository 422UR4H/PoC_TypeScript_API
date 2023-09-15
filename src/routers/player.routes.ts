import { Router } from "express";
import validateAuth from "@/middlewares/validateAuth";
import { playerSchema } from "@/schemas/player.schemas";
import validateSchema from "@/middlewares/validateSchema";
import playerController from "@/controllers/player.controllers";

const router = Router();

router.put("/api/players/:id", validateAuth, validateSchema(playerSchema), playerController.update);
router.delete("/api/players/:id", validateAuth, playerController.deleteById);

export default router;