import createHttpError from "http-errors";
import { User } from "./user.model";
import { deleteInvalidPropertyObject } from "../../utils/function.utils";

export class UserService {
    private model: typeof User;

    constructor() {
        this.model = User;
    }

    async getAllUsers() {
        const users = await this.model.findAll();
        return users;
    }
    async getUserById({ id }: { id: string }) {
        const user  = await User.findByPk(id);
        return user;
    }
    async updateUserById({ id, firstname, lastname, email, address }: { id: string, firstname: string, lastname: string, email: string, address: string }): Promise<void> {
        const user = await this.checkExistUser(id);

        const userData = {
            firstname: firstname || user.firstname,
            lastname: lastname || user.lastname,
            email: email || user.email,
            address: address || user.address
        }

        deleteInvalidPropertyObject(userData, [undefined, null, "", " ", NaN, 0, false]);
        
        const updateUserResult = await this.model.update(userData, { where: { id: user.id } });

        if (!updateUserResult[0]) throw createHttpError.InternalServerError("به روز رسانی کاربر با مشکل مواجه شد"); 
    }
    async removeUserById({ id }: { id: string }): Promise<{ message: string }> {
        const user = await this.checkExistUser(id);

        if (user) {
            await user.destroy();
            return { message: "کاربر با موفقعیت حذف شد" }
        } else {
            return { message: "کاربر مورد نظر پیدا نشد" }
        }
    }
    async changeRoleUser({ id }: { id: string }): Promise<void> {
        const user = await this.checkExistUser(id);

        const changeRoleResult = await user.update({ role: user.role === "ADMIN" ? "USER" : "ADMIN" });

        if (!changeRoleResult) throw createHttpError.InternalServerError("مشکلی در تغییر نقش کاربر رخ داد");
    }

    async checkExistUser(id: string) {
        const user = await User.findByPk(id);
        if (!user) throw createHttpError.NotFound("کاربر مورد نظر پیدا نشد");
        return user;
    }
}

export const userService = new UserService();