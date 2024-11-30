import { Category } from "../../modules/category/category.model";

const getAllCategories = async () => {
    try {
        const categories = await Category.findAll();
        return categories;
    } catch (error:unknown) {
        if (error instanceof Error) {
            return { success: false, error: true, message: error.message };
        }
    }
};

const getCategoryById = async (_:any, args:any, context: any) => {

};

const removeCategoryById = async (_:any, args:any, context: any) => {

};

export {
    getAllCategories,
    getCategoryById,
    removeCategoryById
}