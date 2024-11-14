import Joi from "joi";
import createHttpError from "http-errors";

const registerValidation = Joi.object({
    firstname: Joi.string().required().min(2).max(20).error(createHttpError.BadRequest("نام باید بین 2 کاراکتر یا 20 کاراکتر باشد")),
    lastname: Joi.string().required().min(2).max(20).error(createHttpError.BadRequest("نام خانوادگی باید بین 2 کاراکتر یا 20 کاراکتر باشد")),
    email: Joi.string().email().required().error(createHttpError.BadRequest("ایمیل وارد شده صحیح نیست")),
    phone: Joi.alternatives().try(
        Joi.number().integer().min(1000000000).max(99999999999)
    ).required().error(createHttpError.BadRequest("شماره موبایل بدون وارد کن 0 و باید بین 10 تا 11 رقم باشد")),
    address: Joi.string().required().error(createHttpError.BadRequest("آدرس وارد شده صحیح نیست"))
    
});

export {
    registerValidation
}