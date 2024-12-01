import { NextFunction, Request, Response } from "express";
import { categoryService, CategoryService } from "./category.service";
import { categoryValidation } from "./category.validation";
import { StatusCodes } from "http-status-codes";
import { deleteImageFile, getImageUrl } from "../../utils/function.utils";

class CategoryController {
    private service: CategoryService;

    constructor() {
        this.service = categoryService;

        this.createCategory = this.createCategory.bind(this);
    }

    async createCategory(req:Request<{}, {}, { title: string }>, res:Response, next:NextFunction) {
        try {
            const { title } = req.body;

            await categoryValidation.validateAsync({ title });

            const image = getImageUrl(req.file ?? null, 'categories') as string;
                        
            await this.service.createCategory({ title, image });

            res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                message: "دسته بندی با موفقعیت ایجاد شد",
            })
        } catch (error) {
            const images = getImageUrl(req.file ?? null, "categories", "/public");
            await deleteImageFile(images as string);
            next(error);
        }
    }
}

export const categoryController = new CategoryController();