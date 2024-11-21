import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { UserService, userService } from "./user.service";

class UserController {
    private service: UserService;

    constructor() {
        this.service = userService;
        
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.removeUserById = this.removeUserById.bind(this);
        this.changeRoleUser = this.changeRoleUser.bind(this);
    };

    async getAllUsers(req: Request, res:Response, next:NextFunction) {
        try {
            const users = await this.service.getAllUsers();

            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message: "get all users successFully",
                users
            })
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req: Request<{ id: string }, {}, {}>, res:Response, next:NextFunction) {
        try {
            const { id } = req.params;

            const user = await this.service.getUserById({ id });

            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message: "get user successFully",
                user
            })
        } catch (error) {
            next(error);
        }
    }

    async updateUserById(req: Request, res:Response, next:NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    async removeUserById(req: Request<{ id: string }, {}, {}> , res:Response, next:NextFunction) {
        try {
            const { id } = req.params;

            const { message } = await this.service.removeUserById({ id });

            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message
            })
        } catch (error) {
            next(error);
        }
    }

    async changeRoleUser (req: Request<{ id: string }, {}, {}>, res:Response, next:NextFunction) {
        try {
            const { id } = req.params;

            await this.service.changeRoleUser({ id });

            res.status(StatusCodes.OK).json({
                statusCodes: StatusCodes.OK,
                message: "نقش کاربر با موفقعیت تغییر کرد"
            })
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController();