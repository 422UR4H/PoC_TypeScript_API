import { Router } from "express";
import validateAuth from "@/middlewares/validateAuth";
import validateSchema from "@/middlewares/validateSchema";
import { playerSchema } from "@/schemas/player.schemas";
import { update, deleteById } from "@/controllers/player.controllers";

const router = Router();

router.put("/api/players", validateAuth, validateSchema(playerSchema), update);
router.delete("/api/players", validateAuth, deleteById);

export default router;