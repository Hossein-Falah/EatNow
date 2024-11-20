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
        const user  = await User.findOne({ where: { id }});
        return user;
    }
    async updateUserById() {
        
    }
    async removeUserById() {
        
    }
    async changeRoleUser() {
        
    }
}

export const userService = new UserService();