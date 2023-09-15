import { NextFunction, Request, Response } from "express";
import { CustomError } from "@/protocols/customError.protocols";
import errors from "@/errors/errors";

export default function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
    if (isCustomError(err)) return res.status(err.status).send(err.message);
    res.status(errors.internalServerError().status).send(errors.internalServerError().message);
}

function isCustomError(err: Error): err is CustomError {
    return err.message.startsWith('CustomError');
}