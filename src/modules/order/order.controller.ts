import { NextFunction, Request, Response } from "express";
import { orderService, OrderService } from "./order.service";
import { IOrder } from "./order.interface";
import { createOrderValidation } from "./order.validation";
import { StatusCodes } from "http-status-codes";

class OrderController {
    private service: OrderService;

    constructor() {
        this.service = orderService;

        this.getAllOrders = this.getAllOrders.bind(this);
        this.createOrder = this.createOrder.bind(this);
    }

    async getAllOrders(req:Request, res:Response, next:NextFunction) {
        try {
            const orders = await this.service.getAllOrders();

            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                orders
            })
        } catch (error) {
            next(error);
        }            
    }

    async getUserOrders(req:Request, res:Response, next:NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }        
    }

    async getOrdersByStatus(req:Request, res:Response, next:NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }            
    }

    async getOrderById(req:Request, res:Response, next:NextFunction) {
        try {
        
        } catch (error) {
            next(error);
        }        
    }

    async createOrder(req:Request<{}, {}, IOrder>, res:Response, next:NextFunction) {
        try {
            const { userId, items, address, status } = req.body;

            await createOrderValidation.validateAsync({ userId, items, address });

            const { order } = await this.service.createOrder({ userId, items, address, status });

            res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                message: "سفارش با موفقعیت ثبت شد",
                order
            });
        } catch (error) {
            next(error);
        }        
    }

    async deleteOrder(req:Request, res:Response, next:NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }        
    }

    async calculateOrderTotal(req:Request, res:Response, next:NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }        
    }

    async updateOrderStatus(req:Request, res:Response, next:NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }        
    }
};

export const orderController = new OrderController();