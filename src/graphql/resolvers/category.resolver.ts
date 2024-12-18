import { GraphQLList, GraphQLString } from "graphql";
import { Category } from "../../modules/category/category.model";
import { CategoryType } from "../types/category.types";
import { ResponseType } from "../types/response.types";

const getAllCategories = {
    type: new GraphQLList(CategoryType),
    resolve: async () => {
        try {
            const categories = await Category.findAll();            
            return categories;
        } catch (error:unknown) {
            if (error instanceof Error) {
                return { success: false, error: true, message: error.message };
            }
        }
    }
};

const getCategoryById = {
    type: CategoryType,
    args: {
        id: { type: GraphQLString }
    },
    resolve: async (_:any, { id }: { id: string }) => {
        try {
            const category = await Category.findByPk(id);
            return category
        } catch (error:unknown) {
            if (error instanceof Error) {
                return { success: false, error: true, message: error.message };
            }
        }
    }
}

const removeCategoryById = {
    type: ResponseType,
    args: {
        id: { type: GraphQLString }
    },
    resolve: async (_:any, { id }: { id: string }) => {
        try {
            const category = await Category.findByPk(id);

            if (category) {
                await category.destroy();
                return { success: true, error: false, message: "دسته بندی با موفقعیت حذف شد" };
            } else {
                return { success: false, error: true, message: "دسته بندی مورد نظر پیدا نشد" };
            }
        } catch (error:unknown) {
            if (error instanceof Error) {
                return { success: false, error: true, message: error.message };
            }
        }
    }
}

export {
    getAllCategories,
    getCategoryById,
    removeCategoryById
}