import { NextFunction, Request, Response } from "express";
import { roomService, RoomService } from "./room.service";
import { StatusCodes } from "http-status-codes";

class RoomController {
    private service: RoomService;

    constructor() {
        this.service = roomService;

        this.getAllRooms = this.getAllRooms.bind(this);
    }

    async getAllRooms(req:Request, res:Response, next:NextFunction) {
        try {
            const rooms = await this.service.getAllRooms();

            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                rooms
            })
        } catch (error) {
            next(error);
        }
    }
}

export const roomController = new RoomController();