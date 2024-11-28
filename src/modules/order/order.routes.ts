import { RequestHandler, Router } from "express";
import { orderController } from "./order.controller";
import { AdminGuard } from "../../middlewares/guard/admin.guard";
import { authenticateUser } from "../../middlewares/guard/authenticate.guard";

const orderRouter: Router = Router();

orderRouter.get(`/admin`, AdminGuard as RequestHandler, orderController.getAllOrders);
orderRouter.get(`/user`, authenticateUser, orderController.getUserOrders);
orderRouter.get(`/filter-by-status`, AdminGuard as RequestHandler, orderController.getOrdersByStatus);
orderRouter.get(`/:id`, AdminGuard as RequestHandler, orderController.getOrderById);
orderRouter.post(`/create`, authenticateUser, orderController.createOrder);
orderRouter.delete(`/delete/:id`, AdminGuard as RequestHandler, orderController.deleteOrder);

export default orderRouter;