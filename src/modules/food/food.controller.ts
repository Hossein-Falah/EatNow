import { NextFunction, Request, Response } from "express";
import { foodService, FoodService } from "./food.service";
import { StatusCodes } from "http-status-codes";

class FoodController {
    private service: FoodService;
    
    constructor() {
        this.service = foodService;

        this.getAllFoods = this.getAllFoods.bind(this);
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

    getFoodById(req: Request, res:Response, next:NextFunction) {
        try {
            
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