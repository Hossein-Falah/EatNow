import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

import { authService, AuthService } from "./auth.service";
import { authType } from "../../types";
import { phoneValidation, registerValidation } from "./auth.validation";

class AuthController {
    private service: AuthService;

    constructor() {
        this.service = authService;

        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    async register(req: Request<{}, {}, authType>, res: Response, next: NextFunction) {
        try {
            const { firstname, lastname, email, phone, address } = req.body;
            
            await registerValidation.validateAsync({ firstname, lastname, email, phone, address });

            const { user, accessToken } = await this.service.register({ firstname, lastname, email, phone, address });

            res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                message: "کاربر با موفقعیت ثبت نام شد",
                user,
                accessToken
            });
        } catch (error) {
            next(error);
        }        
    };

    async login(req: Request<{}, {}, { phone: number }>, res: Response, next: NextFunction) {
        try {
            const { phone } = req.body;

            await phoneValidation.validateAsync({ phone });

            await this.service.login({ phone });

            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message: "کد با موفقعیت ارسال شد",
            })
        } catch (error) {
            next(error);
        }
    }

    verifyOTP(req: Request, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    changePassword(req: Request, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    logout(req: Request, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    getMe(req: Request, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }
    }
}

export const authController = new AuthController();