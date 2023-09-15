import { Request, Response } from "express";
import { CreatePlayer } from "@/protocols/player.protocols";
import playerService from "@/services/player.services";
import customErrors from "@/errors/customErrors";

export async function update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (!id) throw customErrors.unprocessableEntity("id");

    const player = req.body as CreatePlayer;
    if (!player) throw customErrors.unprocessableEntity("player");

    const result = await playerService.update(id, player);
    if (result.rowCount < 0) throw customErrors.conflict("nick or email");

    res.send(result.rows[0]);
}

export async function deleteById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (!id || id < 1) throw customErrors.badRequest("id is not valid");

    if (id !== res.locals.user.id) throw customErrors.unauthorized();

    const result = await playerService.deleteById(id);
    if (result.rowCount <= 0) throw customErrors.notFound("player");

    res.send(result.rows[0]);
}

const playerController = {
    update, deleteById
}
export default playerController;