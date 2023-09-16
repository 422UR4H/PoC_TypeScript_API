import { Request, Response } from "express";
import { UpdatePlayer } from "@/protocols/player.protocols";
import playerService from "@/services/player.services";
import customErrors from "@/errors/customErrors";

export async function update(req: Request, res: Response): Promise<void> {
    const { id } = res.locals.user;
    const player = req.body as UpdatePlayer;
    if (!player) throw customErrors.unprocessableEntity("player");

    const result = await playerService.update(id, player);
    if (result.rowCount <= 0) throw customErrors.conflict("nick or email");

    res.send(result.rows[0]);
}

export async function deleteById(req: Request, res: Response): Promise<void> {
    const { id } = res.locals.user;
    const result = await playerService.deleteById(id);
    if (result.rowCount <= 0) throw customErrors.notFound("player");

    res.send(result.rows[0]);
}

const playerController = {
    update, deleteById
}
export default playerController;