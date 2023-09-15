import { Request, Response } from "express";
import { CreatePlayer } from "@/protocols/player.protocols";
import playerService from "@/services/player.services";
import errors from "@/errors/errors";

export async function update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (!id) throw errors.unprocessableEntity("id");

    const player = req.body as CreatePlayer;
    if (!player) throw errors.unprocessableEntity("player");

    const result = await playerService.update(id, player);
    if (result.rowCount < 0) throw errors.conflict("nick or email");

    res.send(result.rows[0]);
}

export async function deleteById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (!id || id < 1) throw errors.badRequest("id is not valid");

    if (id !== res.locals.user.id) throw errors.unauthorized();

    const result = await playerService.deleteById(id);
    if (result.rowCount <= 0) throw errors.notFound("player");

    res.send(result.rows[0]);
}

const playerController = {
    update, deleteById
}
export default playerController;