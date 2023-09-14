import { Router } from "express";
import authRouter from "@/routers/auth.routes";

const router = Router();
router.use(authRouter);

export default router;