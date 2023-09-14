import { clientDB } from "@/database/db.connection";
import { Player } from "@/protocols/player.protocols";

function create(player: Player) {
    const { nick, name, description, avatarUrl, birthday } = player;
    return clientDB.query(`
        INSERT INTO players (nick, name, description, "avatarUrl", birthday)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT DO NOTHING
        RETURNING id;`,
        [nick, name, description, avatarUrl, birthday]
    );
}

function readByNick(nick: string) {
    return clientDB.query(`
        SELECT * FROM players
        WHERE nick = $1;`,
        [nick]
    );
}

export const playerRepository = {
    create, readByNick
};