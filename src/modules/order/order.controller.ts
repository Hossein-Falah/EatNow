import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { orderService, OrderService } from "./order.service";
import { IOrder } from "./order.interface";
import { createOrderValidation } from "./order.validation";

class OrderController {
    private service: OrderService;

    constructor() {
        this.service = orderService;

        this.getAllOrders = this.getAllOrders.bind(this);
        this.getUserOrders = this.getUserOrders.bind(this);
        this.getOrdersByStatus = this.getOrdersByStatus.bind(this);
        this.getOrderById = this.getOrderById.bind(this);
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

    async getUserOrders(req:Request<{id: string}, {}, {}>, res:Response, next:NextFunction) {
        try {
            const { id } = req.params;

            const orders = await this.service.getUserOrders({ id });

            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                orders
            })
        } catch (error) {
            next(error);
        }        
    }

    async getOrdersByStatus(req:Request<{}, {}, {}, { status: string }>, res:Response, next:NextFunction) {
        try {
            const { status } = req.query;
            
            if (!status) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    statusCode: StatusCodes.BAD_REQUEST,
                    message: "پارامتر status اجباری است",
                });
            }

            const orders = await this.service.getOrdersByStatus({ status });

            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                orders
            });
        } catch (error) {
            next(error);
        }            
    }

    async getOrderById(req:Request<{id: string}, {}, {}>, res:Response, next:NextFunction) {
        try {
            const { id } = req.params;

            const order = await this.service.getOrderById({ id });

            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                order
            })
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

    async deleteOrder(req:Request<{id: string}, {}, {}>, res:Response, next:NextFunction) {
        try {
            const { id } = req.params;

            await this.service.deleteOrder({ id });

            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message: "سفارش با موفقعیت حذف شد"
            })
        } catch (error) {
            next(error);
        }        
    }
};

export const orderController = new OrderController();