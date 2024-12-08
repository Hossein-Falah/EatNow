import Joi from "joi";
import createHttpError from "http-errors";

const blogValidation = Joi.object({
    title: Joi.string().required().min(3).max(30).error(createHttpError.BadRequest("نام باید بین 3 کاراکتر یا 30 کاراکتر باشد")),
    description: Joi.string().required().min(5).max(255).error(createHttpError.BadRequest("توضیحات باید بین 5 کاراکتر یا 255 کاراکتر باشد")),
    content: Joi.string().required().error(createHttpError.BadRequest("محتوا وارد شده صحیح نیست")),
    slug: Joi.string().required().min(2).max(50).error(createHttpError.BadRequest("اسلاگ وارد شده نمیتواند خالی باشد. اسلاگ باید بین 2 تا 50 کاراکتر باشد")),
    categoryId: Joi.string().required().uuid().error(createHttpError.BadRequest("دسته وارد شده صحیح نیست")),
    status: Joi.string().required().error(createHttpError.BadRequest("وضعیت وارد شده صحیح نیست"))
});

export {
    blogValidation
}