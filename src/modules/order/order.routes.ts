import { Router } from "express";
import { orderController } from "./order.controller";

const orderRouter: Router = Router();

orderRouter.get(`/admin`, orderController.getAllOrders);
orderRouter.get(`/user/:id`, orderController.getUserOrders);
orderRouter.get(`/filter-by-status`, orderController.getOrdersByStatus);
orderRouter.get(`/:id`, orderController.getOrderById);
orderRouter.post(`/create`, orderController.createOrder);
orderRouter.delete(`/delete/:id`, orderController.deleteOrder);

export default orderRouter;