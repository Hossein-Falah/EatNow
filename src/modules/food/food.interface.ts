export interface IFood {
    id?: string;
    title: string;
    description: string;
    content: string;
    category: "Fruits" | "Vegetables" | "Meat" | "Dessert" | "Drink";
    price: number;
    slug: string;
    quantity: number;
    images: string[];
    rating: number;
    readyTime: number;
    author: string;
    isStock: boolean;
    discountId: string;
}