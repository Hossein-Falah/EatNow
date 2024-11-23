import Joi from "joi";
import createHttpError from "http-errors";

const createFoodValidation = Joi.object({
    title: Joi.string().required().min(3).max(100).error(createHttpError.BadRequest("نام باید بین 3 کاراکتر یا 100 کاراکتر باشد")),
    description: Joi.string().required().min(3).max(500).error(createHttpError.BadRequest("توضیحات باید بین 3 کاراکتر یا 500 کاراکتر باشد")),
    content: Joi.string().required().error(createHttpError.BadRequest("محتوا وارد شده صحیح نیست")),
    category: Joi.string().required().error(createHttpError.BadRequest("دسته وارد شده صحیح نیست")),
    price: Joi.number().required().error(createHttpError.BadRequest("قیمت وارد شده صحیح نیست")),
    slug: Joi.string().required().min(2).max(50).error(createHttpError.BadRequest("اسلاگ وارد شده نمیتواند خالی باشد. اسلاگ باید بین 2 تا 50 کاراکتر باشد")),
    quantity: Joi.number().required().error(createHttpError.BadRequest("تعداد وارد شده صحیح نیست")),
    rating: Joi.number().required().error(createHttpError.BadRequest("امتیاز وارد شده صحیح نیست")),
    readyTime: Joi.number().required().error(createHttpError.BadRequest("زمان آماده سازی وارد شده صحیح نیست"))
})

export {
    createFoodValidation
}