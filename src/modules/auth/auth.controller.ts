import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

import { authService, AuthService } from "./auth.service";
import { authType } from "../../types";
import { phoneValidation, registerValidation, verifyOTPValidation } from "./auth.validation";
import { CustomRequest } from "../user/user.interface";

class AuthController {
    private service: AuthService;

    constructor() {
        this.service = authService;

        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.verifyOTP = this.verifyOTP.bind(this);
        this.refreshToken = this.refreshToken.bind(this);
        this.resendOTP = this.resendOTP.bind(this);
        this.logout = this.logout.bind(this);
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

    async verifyOTP(req: Request<{}, {}, { phone:number; otp: number; }>, res: Response, next: NextFunction) {
        try {
            const { phone, otp } = req.body;

            await verifyOTPValidation.validateAsync(req.body);
        
            const { accessToken, refreshToken } = await this.service.verifyOTP({ phone, otp });

            if (accessToken && refreshToken) {                
                res.cookie('access-token', accessToken, {
                    maxAge: 15 * 60 * 1000, // 15 minutes
                    httpOnly: true
                })
    
                res.cookie('refresh-token', refreshToken, {
                    maxAge: 60 * 60 * 1000, // 1 hour
                    httpOnly: true
                })
            };

            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message: "کد با موفقعیت تایید شد",
                accessToken,
                refreshToken
            })
        } catch (error) {
            next(error);
        }
    }

    async resendOTP(req: Request<{}, {}, { phone: number }>, res: Response, next: NextFunction) {
        try {
            const { phone } = req.body;

            await phoneValidation.validateAsync({ phone });

            await this.service.resendOTP({ phone });

            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message: "کد با موفقعیت ارسال شد"
            });
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req: Request<{}, {}, { refresh_token: string }>, res: Response, next: NextFunction) {
        try {
            const { refresh_token } = req.body;

            const { accessToken, newRefreshToken } = await this.service.refreshToken({ refresh_token });

            res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                message: "توکن جدید با موفقعیت ارسال شد",
                accessToken,
                refreshToken: newRefreshToken
            });  
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            await this.service.logout(res);

            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message: "logout successFully"
            })
        } catch (error) {
            next(error);
        }
    }

    getMe(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user;

            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message: "get user successFully",
                user
            })
        } catch (error) {            
            next(error);
        }
    }
}

export const authController = new AuthController();