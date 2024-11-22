import { NextFunction, Request, Response } from "express";
import { foodService, FoodService } from "./food.service";
import { StatusCodes } from "http-status-codes";

class FoodController {
    private service: FoodService;
    
    constructor() {
        this.service = foodService;

        this.getAllFoods = this.getAllFoods.bind(this);
        this.getFoodById = this.getFoodById.bind(this);
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

    createFood(req:Request, res:Response, next:NextFunction) {
        try {
            
        } catch (error) {
            
        }
    }

    updateFood(req:Request, res:Response, next:NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    removeFood(req:Request, res:Response, next:NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }
    }
}

export const foodController = new FoodController();