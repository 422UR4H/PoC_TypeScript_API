import { NextFunction, Request, Response } from "express";
import { errors } from "@/errors/errors";

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    switch (err.name) {
        case errors.badRequest().name:
            res.status(errors.badRequest().status);
            break;
        case errors.notFound().name:
            res.status(errors.notFound().status);
            break;
        case errors.conflict().name:
            res.status(errors.conflict().status);
            break;
        case errors.unprocessableEntity().name:
            res.status(errors.unprocessableEntity().status);
            break;
        default:
            res.status(errors.internalServerError().status);
    }
    res.send(err.message);
}