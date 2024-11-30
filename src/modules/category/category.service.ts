import createHttpError from "http-errors";
import { ICategory } from "./category.interface";
import { Category } from "./category.model";

export class CategoryService {
    private model: typeof Category;

    constructor () {
        this.model = Category;
    }

    async createCategory({ title, image }: ICategory) {
        await this.checkExistWithTitle(title);

        const createCategoryResult = await this.model.create({ title, image });

        if (!createCategoryResult) throw createHttpError.InternalServerError("مشکلی در ساخت دسته بندی رخ داد");
    }

    async checkExistWithTitle(title: string) {
        const category = await this.model.findOne({ where: { title }});
        if (category) throw createHttpError.Conflict("دسته بندی با این نام قبلا ثبت شده است");
    }
};

export const categoryService = new CategoryService();