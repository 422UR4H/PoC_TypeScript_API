import { NextFunction, Request, Response } from "express";
import { CustomError } from "@/protocols/customError.protocols";
import errors from "@/errors/errors";

export default function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
    console.log(err.message);
    console.log(err.status)
    if (!!err.status) {console.log("RODOU AQUI");return res.status(err.status).send(err.message);}
    res.status(errors.internalServerError().status).send(errors.internalServerError().message);
}