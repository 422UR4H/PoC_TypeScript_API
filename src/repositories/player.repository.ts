import { clientDB } from "@/database/db.connection";
import { CreatePlayer, Player } from "@/protocols/player.protocols";
import { Dayjs } from "dayjs";

function create(player: CreatePlayer) {
    const { nick, name, email, password, description, avatarUrl, birthday } = player;
    return clientDB.query<Number>(`
        INSERT INTO players (nick, name, email, password, description, "avatarUrl", birthday)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT DO NOTHING
        RETURNING id;`,
        [nick, name, email, password, description, avatarUrl, birthday]
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

function update(id: number, player: CreatePlayer, updatedAd: Dayjs) {
    const { nick, name, email, password, description, avatarUrl, birthday } = player;
    return clientDB.query<Player>(`
        UPDATE players
        SET nick = $1, name = $2, email = $3, password = $4, description = $5,
            "avatarUrl" = $6, birthday = $7, "updatedAt" = $8
        WHERE id = $9
        RETURNING *;`,
        [nick, name, email, password, description, avatarUrl, birthday, updatedAd, id]
    );
}

export const playerRepository = {
    create, readByEmail,
    readByNick, readById,
    update
};