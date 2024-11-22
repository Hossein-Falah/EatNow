import createHttpError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken"
import { User } from "../modules/user/user.model";

const signAccessToken = (user: number) => {
    return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "15m" });
};

const signRefreshToken = (user:number) => {
    return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "60m" });
};

const verifyRefreshToken = async (token:string) => {
    try {
        const payload = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;

        const { user } = payload || {}
        
        const userInfo = await User.findOne({ where: { phone: user }});
        
        if (!userInfo) throw createHttpError.NotFound("کاربر یافت نشد");
        
        return userInfo.phone;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw createHttpError.Unauthorized("توکن منقضی شده است لطفا مجددا وارد شوید");
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw createHttpError.Unauthorized("توکن نامعتبر است لطفا توکن را صحیح وارد کنید");
        }
        throw createHttpError.Unauthorized("لطفا دوباره وارد شوید");
    }
}

export {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken
}