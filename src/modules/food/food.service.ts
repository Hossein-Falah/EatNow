import { Food } from "./food.model";

export class FoodService {
    private model: typeof Food;

    constructor() {
        this.model = Food;
    }

    async getAllFoods(): Promise<Food[]> {
        const foods = await this.model.findAll();
        return foods;
    }

    getFoodById() {
        
    }
    
    createFood() {

    }
    
    updateFood() {

    }
    
    removeFood() {

    }
    
}

export const foodService = new FoodService();