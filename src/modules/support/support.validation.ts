import createHttpError from "http-errors";
import Joi from "joi";

const namespaceValidation = Joi.object({
    title: Joi.string().required().min(3).max(30).error(createHttpError.BadRequest("نام باید بین 3 کاراکتر یا 30 کاراکتر باشد")),
    endpoint: Joi.string().required().error(createHttpError.BadRequest("آدرس وارد شده صحیح نیست")),
});

export {
    namespaceValidation
}