import { Router } from "express";
import playerRouter from "@/routers/player.routes";

const router = Router();
router.use(playerRouter);

export default router;