import { RequestHandler, Router } from "express";
import { foodController } from "./food.controller";
import { authenticateUser } from "../../middlewares/guard/authenticate.guard";
import { AdminGuard } from "../../middlewares/guard/admin.guard";
import { uploadMiddleware } from "../../middlewares/uploader.middleware";

const foodRouter: Router = Router();

const uploadFood = uploadMiddleware('foods');

foodRouter.get(`/`, foodController.getAllFoods);
foodRouter.get(`/:id`, foodController.getFoodById);
foodRouter.post(`/add-food`, authenticateUser, AdminGuard as RequestHandler, uploadFood.array('images', 5), foodController.createFood);
foodRouter.patch(`/update/:id`, AdminGuard as RequestHandler, uploadFood.array('images', 5), foodController.updateFood);
foodRouter.delete(`/remove/:id`, AdminGuard as RequestHandler, foodController.removeFood);

export default foodRouter;