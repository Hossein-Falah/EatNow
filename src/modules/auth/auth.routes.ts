import { RequestHandler, Router } from "express";
import { authController } from "./auth.controller";
import { authenticateUser } from "../../middlewares/guard/authenticate.guard";

const authRouter: Router = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/verify-otp', authController.verifyOTP);
authRouter.post('/resend-otp', authController.resendOTP);
authRouter.post('/refresh-token', authController.refreshToken);
authRouter.post('/logout', authController.logout);
authRouter.get('/getMe', authenticateUser, authController.getMe as unknown as RequestHandler);

export default authRouter;
