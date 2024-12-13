import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { nameSpaceService, NameSpaceService } from "./namespace.service";
import { ISupport } from "./support.interface";
import { namespaceValidation } from "./support.validation";

class NameSpaceController {
    private service: NameSpaceService; 

    constructor() {
        this.service = nameSpaceService;

        this.createNamespace = this.createNamespace.bind(this);
    }

    async createNamespace(req:Request<{}, {}, ISupport>, res:Response, next:NextFunction) {
        try {
            const { title, endpoint } = req.body;
            await namespaceValidation.validateAsync({ title, endpoint });

            await this.service.createNamespace({ title, endpoint });

            res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                message: "فضای گفتگو با موفقعیت ساخته شد"
            })
        } catch (error) {
            next(error);
        }            
    }

    getNamespaces(req:Request, res:Response, next:NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }        
    }
}

export const nameSpaceController = new NameSpaceController();