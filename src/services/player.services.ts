import { UpdatePlayer } from "@/protocols/player.protocols";
import playerRepository from "@/repositories/player.repository";
import customErrors from "@/errors/customErrors";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export function update(id: number, player: UpdatePlayer) {
    const { password, birthday } = player;
    if (typeof password !== "string") {
        throw customErrors.unprocessableEntity("password");
    }
    const hash = bcrypt.hashSync(password, 10);
    player.password = hash;
    player.birthday = dayjs(birthday, "DD-MM-YYYY");

    return playerRepository.update(id, player, dayjs());
}

export function deleteById(id: number) {
    return playerRepository.deleteById(id);
}

const playerService = {
    update, deleteById
}
export default playerService;