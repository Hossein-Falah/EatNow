import { AdminGuard } from "../../middlewares/guard/admin.guard";
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

const removeCategoryById = async (_:any, { id }: { id: string }) => {
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
};

export {
    getAllCategories,
    getCategoryById,
    removeCategoryById
}