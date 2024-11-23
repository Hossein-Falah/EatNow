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
    
    async createFood({ title, description, content, category, price, slug, images, rating, readyTime, quantity, author }: IFood): Promise<void> {
        await this.checkExistWithTitle(title);
        
        const createFoodResult = await this.model.create({ 
            title, description, 
            content, category, 
            price, images, slug,
            rating, readyTime, 
            quantity, 
            author, isStock: true
        });

        if (!createFoodResult) throw createHttpError.InternalServerError("مشکلی در ساخت غذا رخ داد");
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

    async checkExistWithTitle(title: string) {
        const food = await this.model.findOne({ where: { title }});
        if (food) throw createHttpError.Conflict("غذا با این نام قبلا ثبت شده است");
        return food;
    }
}

export const foodService = new FoodService();