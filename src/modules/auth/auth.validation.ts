import Joi from "joi";
import createHttpError from "http-errors";

const registerValidation = Joi.object({
    firstname: Joi.string().required().min(2).max(20).error(createHttpError.BadRequest("نام باید بین 2 کاراکتر یا 20 کاراکتر باشد")),
    lastname: Joi.string().required().min(2).max(20).error(createHttpError.BadRequest("نام خانوادگی باید بین 2 کاراکتر یا 20 کاراکتر باشد")),
    email: Joi.string().email().required().error(createHttpError.BadRequest("ایمیل وارد شده صحیح نیست")),
    phone: Joi.number().required().error(createHttpError.BadRequest("شماره موبایل باید 11 کاراکتر باشد")),
    address: Joi.string().required().error(createHttpError.BadRequest("آدرس وارد شده صحیح نیست"))
});

export {
    registerValidation
}