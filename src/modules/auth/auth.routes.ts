import { Router } from "express";
import { authController } from "./auth.controller";

const authRouter: Router = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/verify-otp', authController.verifyOTP);
authRouter.post('/refresh-token', authController.refreshToken);
authRouter.post('/forgot-password', authController.forgotPassword);
authRouter.put('/change-password', authController.changePassword);
authRouter.post('/logout', authController.logout);
authRouter.get('/getMe', authController.getMe);

export default authRouter;
