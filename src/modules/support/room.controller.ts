import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { roomService, RoomService } from "./room.service";
import { IRoom } from "./support.interface";
import { roomValidation } from "./support.validation";
import { deleteImageFile, getImageUrl } from "../../utils/function.utils";

class RoomController {
    private service: RoomService;

    constructor() {
        this.service = roomService;

        this.getAllRooms = this.getAllRooms.bind(this);
        this.createNewRoom = this.createNewRoom.bind(this);
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

    async createNewRoom(req:Request<{}, {}, IRoom>, res:Response, next:NextFunction) {
        try {
            const { name, description, conversationId } = req.body;

            const image = getImageUrl(req.file ?? null, 'room') as string;
            
            await roomValidation.validateAsync({ name, description, conversationId });

            await this.service.createNewRoom({ name, description, conversationId, image });

            res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                message: "اتاق گفتگو با موفقعیت ساخته شد"
            })
        } catch (error) {
            const images = getImageUrl(req.file ?? null, "room", "/public");
            await deleteImageFile(images as string);
            next(error);
        }
    }

    async removeRoomById(req:Request<{ id:string }, {}, {}>, res:Response, next:NextFunction) {
        try {
            const { id } = req.params;

            await this.service.removeRoomById({ id });

            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message: "اتاق گفتگو با موفقعیت پاک شد"
            })
        } catch (error) {
            next(error);
        }
    }
}

export const roomController = new RoomController();