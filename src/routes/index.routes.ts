import { RequestHandler, Router } from "express";
import authRouter from "../modules/auth/auth.routes";
import userRouter from "../modules/user/user.routes";
import { AdminGuard } from "../middlewares/guard/admin.guard";
import foodRouter from "../modules/food/food.routes";

const AllRoutes: Router = Router();

AllRoutes.use(`/auth`, authRouter);
AllRoutes.use(`/users`, AdminGuard as RequestHandler, userRouter);
AllRoutes.use(`/foods`, foodRouter);

export { 
    AllRoutes
}