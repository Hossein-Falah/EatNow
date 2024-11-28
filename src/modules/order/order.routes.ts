import { Router } from "express";
import { orderController } from "./order.controller";

const orderRouter: Router = Router();

orderRouter.get(`/admin`, orderController.getAllOrders);
orderRouter.get(`/user/:id`, orderController.getUserOrders);
orderRouter.get(`/:id`, orderController.getOrderById);
orderRouter.get(`/:status`, orderController.getOrdersByStatus);
orderRouter.post(`/create`, orderController.createOrder);
orderRouter.delete(`/delete/:id`, orderController.deleteOrder);
orderRouter.get(`/total`, orderController.calculateOrderTotal);
orderRouter.put(`/update-status/:id`, orderController.updateOrderStatus);

export default orderRouter;