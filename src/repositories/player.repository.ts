import { clientDB } from "@/database/db.connection";
import { CreatePlayer, Player } from "@/protocols/player.protocols";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

function create(player: CreatePlayer) {
    const { nick, name, email, password, description, avatarUrl, birthday } = player;
    return clientDB.query<Number>(`
        INSERT INTO players (nick, name, email, password, description, "avatarUrl", birthday)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT DO NOTHING
        RETURNING id;`,
        [nick, name, email, password, description, avatarUrl, dayjs(birthday, "DD-MM-YYYY")]
    );
}

function readByEmail(email: string) {
    return clientDB.query<Player>(`
        SELECT * FROM players
        WHERE email = $1;`,
        [email]
    );
}

function readByNick(nick: string) {
    return clientDB.query<Player>(`
        SELECT * FROM players
        WHERE nick = $1;`,
        [nick]
    );
}

function readById(id: number) {
    return clientDB.query<Player>(`
        SELECT * FROM players
        WHERE id = $1;`,
        [id]
    );
}

export const playerRepository = {
    create, readByEmail,
    readByNick, readById
};