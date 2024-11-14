import { Router } from "express";
import authRouter from "../modules/auth/auth.routes";

const AllRoutes: Router = Router();

AllRoutes.use(`/auth`, authRouter);

export { 
    AllRoutes
}