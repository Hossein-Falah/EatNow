import createHttpError from "http-errors";
import jwt from "jsonwebtoken"
import { User } from "../modules/user/user.model";

const signAccessToken = (user: number) => {
    return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "15m" });
};

const signRefreshToken = (user:number) => {
    return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "60m" });
};

const verifyRefreshToken = async (token:string) => {
    try {
        const payload = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);

        const user = await User.findOne({ where: { phone: payload }});

        if (!user) throw createHttpError.NotFound("کاربر یافت نشد");

        return user.phone;
    } catch (error) {
        throw createHttpError.Unauthorized("لطفا دوباره وارد شوید");
    }
}

export {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken
}