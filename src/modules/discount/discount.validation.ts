import Joi from "joi";
import createHttpError from "http-errors";

const discountValidation = Joi.object({
    title: Joi.string().required().min(2).max(50).error(createHttpError.BadRequest("نام باید بین 2 کاراکتر یا 50 کاراکتر باشد")),
    description: Joi.string().optional().allow().error(createHttpError.BadRequest("توضیحات وارد شده صحیح نیست")),
    code: Joi.string().required().error(createHttpError.BadRequest("کد تخفیف وارد شده صحیح نیست")),
    value: Joi.number().required().error(createHttpError.BadRequest("مقدار وارد شده صحیح نمی باشد")),
    endDate: Joi.date().required().error(createHttpError.BadRequest("تاریخ وارد شده صحیح نمی باشد")),
    usageLimit: Joi.number().required().error(createHttpError.BadRequest("حداکثر محدوده وارد شده صحیح نمی باشد"))
});

export {
    discountValidation
}