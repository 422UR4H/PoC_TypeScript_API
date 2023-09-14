import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { errors } from "@/errors/errors";
import { playerRepository } from "@/repositories/player.repository";

dotenv.config();

export default function validateAuth(req: Request, res: Response, next: NextFunction): void {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", '');
    if (!token) throw errors.unauthorized("Bearer token");

    const secret = process.env.JWT_SECRET || process.env.SECRET_KEY || "test";
    jwt.verify(token, secret, async (error: VerifyErrors, decoded: JwtPayload) => {
        if (error) throw errors.unauthorized();

        const user = (await playerRepository.readById(decoded.id))?.rows[0];
        if (!user) throw errors.notFound("player");

        delete user.password;
        res.locals.user = user;
        return next();
    });
}