import createHttpError from "http-errors";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import { Food } from "../food/food.model";
import { User } from "../user/user.model";

export class OrderService {
    private model: typeof Order;
    private foodModel: typeof Food;

    constructor() {
        this.model = Order;
        this.foodModel = Food
    };

    async getAllOrders(): Promise<IOrder[]> {
        const orders = await this.model.findAll({
            attributes: { exclude: ['userId'] },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "firstname", "lastname", "email", "phone", "address"]
                }
            ]
        });

        const populatedOrders = await Promise.all(
            orders.map(async (order) => {
                const populatedItems = await Promise.all(
                    order.items.map(async (item) => {
                        const food = await this.foodModel.findByPk(item.foodId, {
                            attributes: ["id", "title", "description", "content", "category", "price", "slug", "images", "rating", "readyTime", "quantity", "isStock"]
                        });

                        return { ...item, food };
                    })
                )

                return { ...order.toJSON(), items: populatedItems };
            })
        )

        return populatedOrders
    }

    async getUserOrders() {

    }
    
    async getOrdersByStatus() {
        
    }

    async getOrderById() {

    }

    async createOrder({ userId, items, address }: IOrder): Promise<{ order: IOrder}> {
        let totalPrice = 0;

        for (const item of items) {
            const food = await this.foodModel.findByPk(item.foodId);

            if (!food) throw createHttpError.NotFound("غذا مورد نظر پیدا نشد");
        
            if (food.quantity < item.quantity) throw createHttpError.BadRequest("موجودی غذا کافی نیست");

            totalPrice += food.price * item.quantity;
        }

        const order = await this.model.create({
            userId,
            items,
            totalPrice,
            status: "PENDING",
            address
        });

        if (!order) throw createHttpError.InternalServerError("سفارش ایجاد نشد");

        for (const item of items) {
            const food = await this.foodModel.findByPk(item.foodId);

            if (food) {
                await food.update({ quantity: food.quantity - item.quantity });
            }
        }

        return { order };
    }

    async deleteOrder() {

    }

    async calculateOrderTotal() {

    }

    async updateOrderStatus() {

    }
};

export const orderService = new OrderService();