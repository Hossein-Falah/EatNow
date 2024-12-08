import createHttpError from "http-errors";
import { Food } from "./food.model";
import { IFood } from "./food.interface";
import { User } from "../user/user.model";
import { deleteInvalidPropertyObject } from "../../utils/function.utils";

export class FoodService {
    private model: typeof Food;

    constructor() {
        this.model = Food;
    }

    async getAllFoods(): Promise<IFood[]> {
        const foods = await this.model.findAll({
            attributes: { exclude: ['author'] },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "firstname", "lastname", "email", "phone", "address"]
                }
            ]
        });
        return foods;
    }

    async getFoodById({id}: { id: string }): Promise<IFood | []> {
        const food: IFood | null = await this.model.findOne({
            where: { id },
            attributes: { exclude: ['author'] },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "firstname", "lastname", "email", "phone", "address"]
                }
            ]
        })

        if (!food) throw createHttpError.NotFound("غذا مورد نظر یافت نشد");

        return food;
    }
    
    async createFood({ title, description, content, category, price, slug, images, rating, readyTime, quantity, isStock, author, discountId }: IFood): Promise<void> {
        await this.checkExistWithTitle(title);
        await this.checkExistWithSlug(slug);
        
        const createFoodResult = await this.model.create({ 
            title, description, 
            content, category, 
            price, images, slug,
            rating, readyTime, 
            quantity, 
            author, isStock, discountId
        });

        if (!createFoodResult) throw createHttpError.InternalServerError("مشکلی در ساخت غذا رخ داد");
    }
    
    async updateFood({ 
        id, title, description, content, 
        category, price, slug, quantity, 
        images, rating, readyTime, isStock, author, discountId
    }: { id: string } & IFood): Promise<void> {
        const food = await this.checkExistFood(id);

        if (title) {            
            await this.checkExistWithTitle(title);
        }
        
        if (slug) {
            await this.checkExistWithSlug(slug);
        }

        deleteInvalidPropertyObject({ 
            title, description, content, 
            category, price, slug, quantity, 
            images, rating, readyTime, 
            author, discountId
        }, ['author', 'user']);

        const updateFoodResult = await this.model.update({
            title, description, content, 
            category, price, slug, quantity, 
            images, rating, readyTime, 
            isStock, author, discountId
        }, {
            where: { id: food.id }
        });

        if (!updateFoodResult[0]) throw createHttpError.InternalServerError("مشکلی در اپدیت غذا رخ داد");
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

    private async checkExistWithTitle(title: string) {
        const food = await this.model.findOne({ where: { title }});
        if (food) throw createHttpError.Conflict("غذا با این نام قبلا ثبت شده است");
        return food;
    }

    private async checkExistWithSlug(slug: string) {
        const food = await this.model.findOne({ where: { slug }});
        if (food) throw createHttpError.Conflict("غذا با این نام قبلا ثبت شده است");
        return food;
    }
}

export const foodService = new FoodService();