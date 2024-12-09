import createHttpError from "http-errors";
import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { IGraphQLContext } from "../graphql.context";
import { ResponseType } from "../types/response.types";
import { adminGuardUseGraphQL } from "../../middlewares/guard/admin.guard";
import { discountValidation, updateDiscountValidation } from "../../modules/discount/discount.validation";
import { IDiscount } from "../../modules/discount/discount.interface";
import { Discount } from "../../modules/discount/discount.model";
import { DiscountType } from "../types/discount.types";

const getAllDiscounts = {
    type: new GraphQLList(DiscountType),
    resolve: async (_:{}, args:{}, context:IGraphQLContext) => {
        try {
            await adminGuardUseGraphQL(context.token);

            const discounts = await Discount.findAll();            
            return discounts;
        } catch (error:unknown) {
            if (error instanceof Error) {
                return { success: false, error: true, message: error.message };
            }
        }
    }
}

const createDiscount = {
    type: ResponseType,
    args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        code: { type: GraphQLString },
        value: { type: GraphQLInt },
        endDate: { type: GraphQLString },
        usageLimit: { type: GraphQLInt },
        isActive: { type: GraphQLBoolean }
    },
    resolve: async (_:{}, { title, description, code, value, endDate, usageLimit, isActive }:IDiscount, context:IGraphQLContext) => {
        try {
            await adminGuardUseGraphQL(context.token);

            await discountValidation.validateAsync({ title, description, code, value, endDate, usageLimit });

            await checkExistDiscountWithTitle(title)

            const existingDiscount = await Discount.findOne({ where: { code }});
            if (existingDiscount) throw createHttpError.Conflict("کد تخفیف قبلا استفاده شده");

            const newDiscount = await Discount.create({
                title, description, code,
                value, startDate: new Date(),
                endDate: new Date(endDate), usageLimit,
                usedCount: 0, isActive
            });

            if (!newDiscount) throw createHttpError.InternalServerError("خطایی در ایجاد کد تخفیف رخ داده");

            return { success: true, error: false, message: "تخفیف با موفقعیت ایجاد شد" };
        } catch (error:unknown) {
            if (error instanceof Error) {
                return { success: false, error: true, message: error.message };
            }
        }
    }
};

const updateDiscount = {
    type: ResponseType,
    args: {
        id: { type: GraphQLString },
        code: { type: GraphQLString },
        value: { type: GraphQLInt }
    },
    resolve: async (_:{}, { id, code, value }:IDiscount, context:IGraphQLContext) => {
        try {
            await adminGuardUseGraphQL(context.token);

            await updateDiscountValidation.validateAsync({ code, value });

            const discount = await Discount.findByPk(id);
            if (!discount) throw createHttpError.NotFound("کد تخفیف مورد نظر پیدا نشد");

            const updateDiscount = await Discount.update({ code, value }, { where: { id } });
            if (!updateDiscount[0]) throw createHttpError.InternalServerError("خطایی در ویرایش کد تخفیف رخ داده لطفا دوباره تلاش کنید");

            return { success: true, error: false, message: "کد تخفیف با موفقعیت ویرایش شد" };
        } catch (error:unknown) {
            if (error instanceof Error) {
                return { success: false, error: true, message: error.message };
            }
        }
    }
}

const deleteDiscount = {
    type: ResponseType,
    args: {
        id: { type: GraphQLString }
    },
    resolve: async (_:{}, { id }:IDiscount, context:IGraphQLContext) => {
        try {
            await adminGuardUseGraphQL(context.token);

            const discount = await Discount.findByPk(id);
            if (!discount) throw createHttpError.NotFound("کد تخفیف مورد نظر پیدا نشد");

            await discount.destroy();
            return { success: true, error: false, message: "کد تخفیف با موفقعیت حذف شد" };
        } catch (error:unknown) {
            if (error instanceof Error) {
                return { success: false, error: true, message: error.message };
            }
        }
    }
}

const checkExistDiscountWithTitle = async (title:string): Promise<IDiscount | null> => {
    const discount = await Discount.findOne({ where: { title }});
    if (discount) throw createHttpError.Conflict("کد تخفیفی قبلا با این نام ثبت شده");
    return discount;
}

export {
    getAllDiscounts,
    createDiscount,
    deleteDiscount,
    updateDiscount
}