import { Router } from "express";
import { categoryController } from "./category.controller";
import { uploadMiddleware } from "../../middlewares/uploader.middleware";

const categoryRouter: Router = Router();

const uploadFood = uploadMiddleware('categories');

categoryRouter.post(`/create`, uploadFood.single('image'), categoryController.createCategory);

export default categoryRouter;