import { Router } from "express";
import authRouter from "@/routers/auth.routes";
import playerRouter from "@/routers/player.routes";

const router = Router();
router
    .use(authRouter)
    .use(playerRouter);

export default router;