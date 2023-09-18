import { Router } from "express";
import validateAuth from "@/middlewares/validateAuth";
import validateSchema from "@/middlewares/validateSchema";
import { updatePlayerSchema } from "@/schemas/player.schemas";
import { update, deleteById, find } from "@/controllers/player.controllers";

const router = Router();

router.get("/api/find-players-by", validateAuth, find);
router.put("/api/players", validateAuth, validateSchema(updatePlayerSchema), update);
router.delete("/api/players", validateAuth, deleteById);

export default router;