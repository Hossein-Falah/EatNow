import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { foodService, FoodService } from "./food.service";
import { IFood } from "./food.interface";
import { createFoodValidation } from "./food.validation";
import { IUser } from "../user/user.interface";
import { deleteImageFile, getListOfImages } from "../../utils/function.utils";

interface CustomRequest extends Request {
    user?: IUser;
}

interface CustomFile extends Request {
    files: any
}

class FoodController {
    private service: FoodService;
    
    constructor() {
        this.service = foodService;

        this.getAllFoods = this.getAllFoods.bind(this);
        this.getFoodById = this.getFoodById.bind(this);
        this.createFood = this.createFood.bind(this);
        this.removeFood = this.removeFood.bind(this);
    };

    async getAllFoods(req:Request, res:Response, next: NextFunction) {
        try {
            const foods = await this.service.getAllFoods();

            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                foods
            })
        } catch (error) {
            next(error);
        }
    }

    async getFoodById(req: Request<{id: string}, {}, {}>, res:Response, next:NextFunction) {
        try {
            const { id } = req.params;

            const food = await this.service.getFoodById({ id });

            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                food
            })
        } catch (error) {
            next(error);
        }
    }

    async createFood(req:Request<{}, {}, IFood>, res:Response, next:NextFunction) {
        try {
            const user = (req as CustomRequest).user;
            const { title, description, content, category, price, slug, rating, readyTime, quantity } = req.body;
            const images = getListOfImages((req as CustomFile).files, "foods")
            
            await createFoodValidation.validateAsync({ title, description, content, category, price, slug, rating, readyTime, quantity });

            await this.service.createFood({ 
                title, description, 
                content, category, 
                price, images, slug,
                rating, readyTime, 
                quantity, 
                author: user?.id ?? '', 
                isStock: true
            });

            res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                message: "غذا با موفقعیت ساخته شد"
            })
        } catch (error) {
            const images = getListOfImages((req as CustomFile).files, "foods", "/public");
            await deleteImageFile(images);
            next(error);
        }
    }

    updateFood(req:Request, res:Response, next:NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    async removeFood(req:Request<{ id: string }, {}, {}>, res:Response, next:NextFunction) {
        try {
            const { id } = req.params;

            const { message } = await this.service.removeFood({ id });

            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message
            })
        } catch (error) {
            next(error);
        }
    }
}

export const foodController = new FoodController();