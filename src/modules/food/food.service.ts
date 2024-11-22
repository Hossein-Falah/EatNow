import createHttpError from "http-errors";
import { Food } from "./food.model";
import { IFood } from "./food.interface";

export class FoodService {
    private model: typeof Food;

    constructor() {
        this.model = Food;
    }

    async getAllFoods(): Promise<IFood[]> {
        const foods = await this.model.findAll();
        return foods;
    }

    async getFoodById({id}: { id: string }): Promise<IFood> {
        const food = await this.checkExistFood(id);
        return food;
    }
    
    createFood() {

    }
    
    updateFood() {

    }
    
    async removeFood({ id }: { id: string }): Promise<{ message: string }> {
        const food = await this.checkExistFood(id);

        if (food) {
            await food.destroy();
            return { message: "کاربر مورد نظر پاک شد" }
        } else {
            return { message: "کاربر مورد نظر پیدا نشد" }
        }
    }

    async checkExistFood(id:string) {
        const food = await this.model.findByPk(id);
        if (!food) throw createHttpError.NotFound("غذای مورد نظر پیدا نشد");
        return food;
    }
    
}

export const foodService = new FoodService();