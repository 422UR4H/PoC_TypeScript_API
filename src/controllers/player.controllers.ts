import { Request, Response } from "express";
import { playerService } from "@/services/player.services";
import { errors } from "@/errors/errors";
import { Player } from "@/protocols/player.protocols";
import httpStatus from "http-status";

async function create(req: Request, res: Response): Promise<void> {
    const player: Player = req.body;
    if (!player) throw errors.unprocessableEntity("player");
    await playerService.create(player);
    res.sendStatus(httpStatus.CREATED);
}

export const playerController = {
    create
}