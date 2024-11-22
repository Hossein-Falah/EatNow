import createHttpError from "http-errors";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";

import { User } from "../../modules/user/user.model";
import { IUser } from "../../modules/user/user.interface";

type headersType = {
    authorization?: string
}

interface CustomRequest extends Request {
    user?: IUser
}

const getToken = (headers: headersType) => {
    const authorization = headers?.authorization || "";
    const [bearer, token] = authorization.split(" ");

    if (token && ["Bearer", "bearer"].includes(bearer)) return token;
    
    throw createHttpError.Unauthorized("حساب کاربری شناسایی نشد لطفا مجددا لاگین کنید");
};

export const authenticateUser = async (req:CustomRequest, res:Response, next:NextFunction) => {
    try {
        const token = getToken(req.headers);

        const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
        
        const { user } = payload || {};        

        const userInfo = await User.findOne({ where: { phone: user }, attributes: { exclude: ["otp", "otpExpiry"] } });
        if (!userInfo) throw createHttpError.Unauthorized("حساب کاربری شناسایی نشد لطفا مجددا لاگین کنید");

        req.user = userInfo.dataValues;
        next();
    } catch (error: unknown) {
        if (error instanceof TokenExpiredError) {
            return next(createHttpError.Unauthorized("لطفا مجددا وارد شوید"));
        }
        next(error);
    }
}