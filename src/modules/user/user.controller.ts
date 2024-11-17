import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { UserService, userService } from "./user.service";

class UserController {
    private service: UserService;

    constructor() {
        this.service = userService;
        
        this.getAllUsers = this.getAllUsers.bind(this);
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

    async getUserById(req: Request, res:Response, next:NextFunction) {
        try {
            
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

    async removeUserById(req: Request, res:Response, next:NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    async changeRoleUser (req: Request, res:Response, next:NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController();