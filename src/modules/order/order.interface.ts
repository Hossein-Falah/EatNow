export interface IOrder {
    id: string;
    userId: string;
    items: {
        foodId: string;
        quantity: number;
    }[];
    totalPrice: number;
    status: "PENDING" | "PREPARING" | "DELIVERED" | "CANCELED";
    address: string;
}