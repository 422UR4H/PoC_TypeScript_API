import { NextFunction, Request, Response } from "express";
import customErrors from "@/errors/customErrors";
import { CustomError } from "@/protocols/customError.protocols";

export default function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
    if (!!err.status) return res.status(err.status).send(err.message);
    res.status(customErrors.internalServerError().status).send(customErrors.internalServerError().message);
}