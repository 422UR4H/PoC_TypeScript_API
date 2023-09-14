import { CustomError } from "@/protocols/customError.protocols";
import httpStatus from "http-status";

function badRequest(message: string = "entity is not valid"): CustomError {
    return {
        name: "badRequest",
        message,
        status: httpStatus.BAD_REQUEST
    };
}
function notFound(entity: string = "entity"): CustomError {
    return {
        name: "notFound",
        message: `${entity} does not exist`,
        status: httpStatus.NOT_FOUND
    };
}
function conflict(entity: string = "entity"): CustomError {
    return {
        name: "conflict",
        message: `${entity} already exists`,
        status: httpStatus.CONFLICT
    };
}
function unprocessableEntity(entity?: string | Array<string>): CustomError {
    let message: string;

    if (entity == null) {
        message = "entity is not valid";
    } else if (typeof entity === "string") {
        message = `${entity} is not valid`;
    } else {
        message = entity.join("\n");
    }
    return {
        name: "unprocessableEntity",
        message,
        status: httpStatus.UNPROCESSABLE_ENTITY
    };
}
function internalServerError(message: string = "internal server error"): CustomError {
    return {
        name: "internalServerError",
        message,
        status: httpStatus.INTERNAL_SERVER_ERROR
    };
}
export const errors = {
    badRequest,
    notFound,
    conflict,
    unprocessableEntity,
    internalServerError
};