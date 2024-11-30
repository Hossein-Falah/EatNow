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

const getCategoryById = async (_:any, { id }: { id: string }) => {
    try {
        const cateory = await Category.findByPk(id);
        return cateory;
    } catch (error:unknown) {
        if (error instanceof Error) {
            return { success: false, error: true, message: error.message };
        }
    }
};

const removeCategoryById = async (_:any, args:any, context: any) => {

};

export {
    getAllCategories,
    getCategoryById,
    removeCategoryById
}