import createHttpError from "http-errors";
import Joi from "joi";

const namespaceValidation = Joi.object({
    title: Joi.string().required().min(3).max(30).error(createHttpError.BadRequest("نام باید بین 3 کاراکتر یا 30 کاراکتر باشد")),
    endpoint: Joi.string().required().error(createHttpError.BadRequest("آدرس وارد شده صحیح نیست")),
});

const roomValidation = Joi.object({
    name: Joi.string().required().min(3).max(30).error(createHttpError.BadRequest("نام باید بین 3 کاراکتر یا 30 کاراکتر باشد")),
    description: Joi.string().required().min(3).max(255).error(createHttpError.BadRequest("توضیحات باید بین 3 کاراکتر یا 255 کاراکتر باشد")),
    conversationId: Joi.string().required().uuid().error(createHttpError.BadRequest("فضای وارد شده صحیح نیست")),
})

export {
    namespaceValidation,
    roomValidation
}