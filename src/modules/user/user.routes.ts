import { RequestHandler, Router } from "express";
import { userController } from "./user.controller";
import { AdminGuard } from "../../middlewares/guard/admin.guard";

const userRouter: Router = Router();

userRouter.get('/', AdminGuard as RequestHandler, userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.patch(`/update/:id`, userController.updateUserById);
userRouter.delete(`/remove/:id`, userController.removeUserById);
userRouter.put(`/change-role/:id`, userController.changeRoleUser);

export default userRouter;