import createHttpError from "http-errors";
import { GraphQLBoolean, GraphQLInt, GraphQLString } from "graphql";
import { IGraphQLContext } from "../graphql.context";
import { ResponseType } from "../types/response.types";
import { adminGuardUseGraphQL } from "../../middlewares/guard/admin.guard";
import { discountValidation } from "../../modules/discount/discount.validation";
import { IDiscount } from "../../modules/discount/discount.interface";
import { Discount } from "../../modules/discount/discount.model";

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

            const existingDiscount = await Discount.findOne({ where: { code }});
            if (existingDiscount) throw createHttpError.Conflict("کد تخیفیف قبلا استفاده شده");

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

export {
    createDiscount
}