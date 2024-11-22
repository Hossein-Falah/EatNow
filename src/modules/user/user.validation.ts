import Joi from "joi";
import createHttpError from "http-errors";

export const updateUserValidation = Joi.object({
    firstname: Joi.string().optional().allow(null, '').min(2).max(20).error(createHttpError.BadRequest("نام باید بین 2 کاراکتر یا 20 کاراکتر باشد")),
    lastname: Joi.string().optional().allow(null, '').min(2).max(20).error(createHttpError.BadRequest("نام خانوادگی باید بین 2 کاراکتر یا 20 کاراکتر باشد")),
    email: Joi.string().optional().allow(null, '').email().error(createHttpError.BadRequest("ایمیل وارد شده صحیح نیست")),
    address: Joi.string().optional().allow(null, '').error(createHttpError.BadRequest("آدرس وارد شده صحیح نیست")),
})