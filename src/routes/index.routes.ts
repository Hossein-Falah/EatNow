import { RequestHandler, Router } from "express";
import authRouter from "../modules/auth/auth.routes";
import userRouter from "../modules/user/user.routes";
import { AdminGuard } from "../middlewares/guard/admin.guard";

const AllRoutes: Router = Router();

AllRoutes.use(`/auth`, authRouter);
AllRoutes.use(`/users`, AdminGuard as RequestHandler, userRouter);

export { 
    AllRoutes
}