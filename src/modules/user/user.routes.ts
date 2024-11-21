import { Router } from "express";
import { userController } from "./user.controller";

const userRouter: Router = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.patch(`/update/:id`, userController.updateUserById);
userRouter.delete(`/remove/:id`, userController.removeUserById);
userRouter.put(`/change-role/:id`, userController.changeRoleUser);

export default userRouter;