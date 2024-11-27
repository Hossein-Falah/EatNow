import Joi from "joi";
import createHttpError from "http-errors";

const createOrderValidation = Joi.object({
    userId: Joi.string().required().uuid().error(createHttpError.BadRequest("کاربر وارد شده صحیح نیست")),
    items: Joi.array().items(
        Joi.object({
            foodId: Joi.string().required().uuid().error(createHttpError.BadRequest("شناسه غذا وارد شده صحیح نیست")),
            quantity: Joi.number().required().min(1).error(createHttpError.BadRequest("تعداد وارد شده صحیح نیست"))
        })
        .min(1).required().error(createHttpError.BadRequest("حداقل یک ایتم باید سفارش داده شود"))
    ),
    address: Joi.string().required().min(10).error(createHttpError.BadRequest("آدرس وارد شده حداقل باید 10 کاراکتر باشد"))
});

export {
    createOrderValidation
}