import Joi from "joi";
import createHttpError from "http-errors";

export const categoryValidation = Joi.object({
    title: Joi.string().required().min(3).max(30).error(createHttpError.BadRequest("نام باید بین 3 کاراکتر یا 30 کاراکتر باشد")),
})