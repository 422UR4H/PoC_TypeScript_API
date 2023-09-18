import { clientDB } from "@/database/db.connection";
import { Player, CreatePlayer, UpdatePlayer } from "@/protocols/player.protocols";
import { Dayjs } from "dayjs";

const LIMIT = 8;

export function create(player: CreatePlayer) {
    const { nick, name, email, password, description, avatarUrl, birthday } = player;
    return clientDB.query<Number>(`
        INSERT INTO players
            (nick, name, email, password, description, "avatarUrl", birthday)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT DO NOTHING
        RETURNING id;`,
        [nick, name, email, password, description, avatarUrl, birthday]
    );
}

export function readByEmail(email: string) {
    return clientDB.query<Player>(`
        SELECT * FROM players
        WHERE email = $1;`,
        [email]
    );
}

export function find(nick: string, email: string) {
    return clientDB.query<Player>(`
        SELECT nick, email
        FROM players
        WHERE nick ILIKE COALESCE($1, nick)
            OR email ILIKE COALESCE($2, email)
        ORDER BY nick, email
        LIMIT $3;`,
        [`%${nick}%`, `%${email}%`, LIMIT]
    );
}

export function readById(id: number) {
    return clientDB.query<Player>(`
        SELECT * FROM players
        WHERE id = $1;`,
        [id]
    );
}

export function update(id: number, player: UpdatePlayer, updatedAd: Dayjs) {
    const { name, email, password, description, avatarUrl, birthday } = player;
    return clientDB.query<Player>(`
        UPDATE players
            SET name = $2,
                email = $3,
                password = $4,
                description = $5,
                "avatarUrl" = $6,
                birthday = $7,
                "updatedAt" = $8
        WHERE id = $1
        RETURNING *;`,
        [id, name, email, password, description, avatarUrl, birthday, updatedAd]
    );
}

export function deleteById(id: number) {
    return clientDB.query<Player>(`
        DELETE FROM players
        WHERE id = $1
        RETURNING *;`,
        [id]
    );
}

const playerRepository = {
    create, readById, readByEmail, find,
    update, deleteById
};
export default playerRepository;