import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

export const playerSchema = Joi.object({
    nick: Joi.string().min(4).max(16).required(),
    name: Joi.string().min(4).max(32).required(),
    description: Joi.string().max(255),
    avatarUrl: Joi.string().uri(),
    birthday: Joi.date().format('DD-MM-YYYY').less('now').required()
});