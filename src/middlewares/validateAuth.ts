import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import errors from "@/errors/errors";
import { playerRepository } from "@/repositories/player.repository";
import httpStatus from "http-status";

dotenv.config();

export default function validateAuth(req: Request, res: Response, next: NextFunction): void {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", '');
    if (!token || token.includes(' ')) throw errors.unauthorized("Bearer token");

    try {
        const secret = process.env.JWT_SECRET || process.env.SECRET_KEY || "test";
        jwt.verify(token, secret, async (error: VerifyErrors, decoded: JwtPayload) => {
            if (error) return res.status(httpStatus.UNAUTHORIZED).send("token is not valid");

            const user = (await playerRepository.readById(decoded.id))?.rows[0];
            if (!user) return errors.notFound("player");

            delete user.password;
            res.locals.user = user;
            return next();
        });
    } catch (err) {
        errors.internalServerError(err.message);
    }
}