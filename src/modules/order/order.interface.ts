import { IFood } from "../food/food.interface";

export interface IOrder {
    id?: string;
    userId: string;
    items: {
        foodId: string;
        quantity: number;
    }[];
    totalPrice?: number;
    status: "PENDING" | "PREPARING" | "DELIVERED" | "CANCELED";
    address: string;
    discountId: string;
}

export interface IOrderItem {
    foodId: string;
    quantity: number;
    food?: IFood | null; // Optional populated food details
}