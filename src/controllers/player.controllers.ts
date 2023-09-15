import { Request, Response } from "express";
import { playerService } from "@/services/player.services";
import { CreatePlayer } from "@/protocols/player.protocols";
import errors from "@/errors/errors";


async function update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (!id) throw errors.unprocessableEntity("id");

    const player = req.body as CreatePlayer;
    if (!player) throw errors.unprocessableEntity("player");

    const result = await playerService.update(id, player);
    if (result.rowCount < 0) throw errors.internalServerError();

    res.send(result.rows[0]);
}

export const playerController = {
    update
}