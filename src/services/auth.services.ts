import { errors } from "@/errors/errors";
import { CreatePlayer } from "@/protocols/player.protocols";
import { playerRepository } from "@/repositories/player.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signUp(player: CreatePlayer): Promise<void> {
    const { password } = player;
    const hash = bcrypt.hashSync(password, 10);
    player.password = hash;

    const result = await playerRepository.create(player);
    if (result.rowCount <= 0) throw errors.conflict("nick or email of player");
}

async function signIn(email: string, password: string): Promise<any> {
    const result = await playerRepository.readByEmail(email);
    if (result.rowCount <= 0) throw errors.notFound("email");

    const player = result.rows[0];
    if (!bcrypt.compareSync(password, player.password)) {
        throw errors.unauthorized("password");
    }

    const token = jwt.sign(
        { id: player.id },
        process.env.JWT_SECRET || process.env.SECRET_KEY || "test",
        { expiresIn: 24 * 60 * 60 * 7 }
    );
    return { token, player };
}

export const authService = {
    signUp, signIn
};