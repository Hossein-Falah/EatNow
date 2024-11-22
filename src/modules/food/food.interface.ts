export interface IFood {
    id?: string;
    title: string;
    description: string;
    content: string;
    category: string[];
    price: number;
    quantity: number;
    images: [string];
    rating: number;
    readyTime: number;
    author: string;
    isStock: boolean;
}