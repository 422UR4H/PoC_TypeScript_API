import { errors } from "@/errors/errors";
import { Player } from "@/protocols/player.protocols";
import { playerRepository } from "@/repositories/player.repository";
import bcrypt from "bcrypt";

async function create(player: Player): Promise<void> {
    const { password } = player;
    const hash = bcrypt.hashSync(password, 10);
    player.password = hash;

    const result = await playerRepository.create(player);
    if (result.rowCount <= 0) throw errors.conflict("nick or email of player");
}

export const playerService = {
    create
};