import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import errors from "@/errors/errors";

export default function validateSchema(schema: ObjectSchema<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) throw errors.unprocessableEntity(error.details.map(d => d.message));
        next();
    }
}