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

    login() {
        
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

    async checkExistUser(email:string, phone:number) {
        const user = await this.model.findOne({ where: { email, phone } });
        return user;
    }
}

export const authService = new AuthService();