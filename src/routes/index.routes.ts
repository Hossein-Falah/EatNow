import { RequestHandler, Router } from "express";
import authRouter from "../modules/auth/auth.routes";
import userRouter from "../modules/user/user.routes";
import { AdminGuard } from "../middlewares/guard/admin.guard";
import foodRouter from "../modules/food/food.routes";
import orderRouter from "../modules/order/order.routes";
import categoryRouter from "../modules/category/category.routes";

const AllRoutes: Router = Router();

AllRoutes.use(`/auth`, authRouter);
AllRoutes.use(`/users`, AdminGuard as RequestHandler, userRouter);
AllRoutes.use(`/foods`, foodRouter);
AllRoutes.use(`/orders`, orderRouter);
AllRoutes.use(`/categories`, categoryRouter);

export { 
    AllRoutes
}