import { Request, Response } from "express";
import { CreatePlayer } from "@/protocols/player.protocols";
import { authService } from "@/services/auth.services";
import { Auth } from "@/protocols/auth.protocols";
import errors from "@/errors/errors";
import httpStatus from "http-status";


async function signUp(req: Request, res: Response): Promise<void> {
    const player = req.body as CreatePlayer;
    if (!player) throw errors.unprocessableEntity("player");
    await authService.signUp(player);
    res.sendStatus(httpStatus.CREATED);
}

async function signIn(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as Auth;
    const { token, player } = await authService.signIn(email, password);
    res.send({ token, player });
}

export const authController = {
    signUp, signIn
}