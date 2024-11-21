import createHttpError from "http-errors";
import { User } from "./user.model";

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
    async updateUserById() {
        
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