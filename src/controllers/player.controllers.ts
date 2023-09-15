import { Request, Response } from "express";
import { playerService } from "@/services/player.services";
import { CreatePlayer } from "@/protocols/player.protocols";
import errors from "@/errors/errors";
import httpStatus from "http-status";


async function update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (!id) throw errors.unprocessableEntity("id");

    const player = req.body as CreatePlayer;
    if (!player) throw errors.unprocessableEntity("player");

    const result = await playerService.update(id, player);
    if (result.rowCount < 0) throw errors.conflict("nick or email");

    res.send(result.rows[0]);
}

async function deleteById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (!id || id < 1) throw errors.badRequest("id is not valid");

    if (id !== res.locals.user.id) throw errors.unauthorized();

    const result = await playerService.deleteById(id);
    if (result.rowCount <= 0) throw errors.notFound("player");

    console.log(result.rows[0])
    res.send(result.rows[0]);
}

export const playerController = {
    update, deleteById
}