import { RequestHandler, Router } from "express";
import { authController } from "./auth.controller";
import { authenticateUser } from "../../middlewares/guard/authenticate.guard";

const authRouter: Router = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/verify-otp', authController.verifyOTP);
authRouter.post('/refresh-token', authController.refreshToken);
authRouter.post('/forgot-password', authController.forgotPassword);
authRouter.put('/change-password', authController.changePassword);
authRouter.post('/logout', authController.logout);
authRouter.get('/getMe', authenticateUser, authController.getMe as unknown as RequestHandler);

export default authRouter;
