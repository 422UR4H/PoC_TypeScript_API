import { CreatePlayer } from "@/protocols/player.protocols";
import { playerRepository } from "@/repositories/player.repository";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

function update(id: number, player: CreatePlayer) {
    player.birthday = dayjs(player.birthday, "DD-MM-YYYY");
    return playerRepository.update(id, player, dayjs());
}

function deleteById(id: number) {
    return playerRepository.deleteById(id);
}

export const playerService = {
    update, deleteById
}