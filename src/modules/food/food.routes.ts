import { Router } from "express";
import { foodController } from "./food.controller";

const foodRouter: Router = Router();

foodRouter.get(`/`, foodController.getAllFoods);
foodRouter.get(`/:id`, foodController.getFoodById);
foodRouter.post(`/add-food`, foodController.createFood);
foodRouter.patch(`/update/:id`, foodController.updateFood);
foodRouter.delete(`/remove/:id`, foodController.removeFood);

export default foodRouter;