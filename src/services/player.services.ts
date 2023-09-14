import { errors } from "@/errors/errors";
import { Player } from "@/protocols/player.protocols";
import { playerRepository } from "@/repositories/player.repository";

async function create(player: Player): Promise<void> {
    if ((await playerRepository.create(player)).rowCount <= 0) {
        throw errors.conflict("nick of player");
    }
}

export const playerService = {
    create
};