import createHttpError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import { IUser } from "../../modules/user/user.interface";
import { User } from "../../modules/user/user.model";

interface CustomRequest extends Request {
    user: IUser;
}

export const AdminGuard = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const authorization = req.headers['authorization']?.split(" ")[1];
        
        if (authorization) {
            const { user }: JwtPayload = <JwtPayload>jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET!);
            
            const userInfo: IUser | null = await User.findOne({ where: { phone: user } });

            if (userInfo?.role === "ADMIN") {
                (req as CustomRequest).user = userInfo;
                next();
            } else {
                throw createHttpError.Forbidden("شما دسترسی به این Api Route را ندارید");
            }
        } else {
            throw createHttpError.Forbidden("شما دسترسی به این Api Route را ندارید")
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                statusCode: StatusCodes.UNAUTHORIZED,
                message: "توکن شما منقضی شده است لطفا مجدداً وارد شوید",
            });
        }

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                statusCode: StatusCodes.UNAUTHORIZED,
                message: "توکن نامعتبر است",
            });
        }
        next(error);
    }
}