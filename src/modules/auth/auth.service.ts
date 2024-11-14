import createHttpError from "http-errors";
import { authType } from "../../types";
import { User } from "../user/user.model";
import { signAccessToken } from "../../utils/token.utils";

export class AuthService {
    private model: typeof User;

    constructor() {
        this.model = User
    }

    
    async register({ firstname, lastname, email, phone, address }: authType): Promise<{ user: User, accessToken: string }>{
        const isExistUser = await this.checkExistUser(email, phone);

        if (isExistUser) throw createHttpError.Conflict("کاربری با این مشخصات قبلا ثبت نام کرده است");

        const userCount = await this.model.count();
        
        const newUser = await this.model.create({ 
            firstname,
            lastname,
            email,
            phone,
            address,
            role: userCount === 0 ? "ADMIN" : "USER",
            latitude: 0,
            longitude: 0,
            cart: []
        })

        if (!newUser) throw createHttpError.InternalServerError();

        const accessToken = signAccessToken(phone);

        return { user: newUser, accessToken };
    };

    async login({ phone }: { phone: number} ): Promise<void> {
        const user = await this.checkExistUser(undefined, phone);

        if (!user) throw createHttpError.NotFound("کاربری با همچین شماره ای ثبت نشده نام نشده است");

        const code: number = Math.floor(Math.random() * 99999);
        const otpExpiry = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes from now

        const updatedUser = await user.update({ otp: code, otpExpiry });
        
        if (!updatedUser) throw createHttpError.InternalServerError("خطایی در اسال کد OTP رخ داده لطفا دوباره تلاش کنید");
    }

    verifyOTP() {
        
    }

    refreshToken() {
        
    }

    forgotPassword() {
        
    }

    resetPassword() {
        
    }

    changePassword() {
        
    }

    logout() {
        
    }

    getMe() {

    }

    async checkExistUser(email?:string, phone?:number) {
        const query = {};
        if (email) (query as {email:string}).email = email;
        if (phone) (query as {phone:number}).phone = phone;

        const user = await this.model.findOne({ where: query });
        return user;
    }
}

export const authService = new AuthService();