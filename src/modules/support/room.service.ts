import createHttpError from "http-errors";
import { Room } from "./room.model";
import { IRoom } from "./support.interface";
import { Conversation } from "./conversation.model";

export class RoomService {
    private model: typeof Room;
    private conversationModel: typeof Conversation

    constructor() {
        this.model = Room;
        this.conversationModel = Conversation;
    }

    async getAllRooms():Promise<IRoom[]> {
        const rooms = await this.model.findAll();
        return rooms;
    }

    async createNewRoom({ name, description, conversationId, image }: IRoom) {
        await this.checkExistWithName(name);
        await this.checkExistWithConversation(conversationId as string);

        const createRoom = await this.model.create({ name, description, conversationId, image });
        if (!createRoom) throw createHttpError.InternalServerError("مشکلی در ساخت اتاق گفتگو پیش آمده");
    }

    async checkExistWithName(name:string):Promise<void> {
        const room = await this.model.findOne({ where: { name } });
        if (room) throw createHttpError.Conflict("اتاق گفتگو با این نام قبلا ثبت شده است");
    }

    async checkExistWithConversation(id:string): Promise<void> {
        const room = await this.conversationModel.findOne({ where: { id }});
        if (!room) throw createHttpError.NotFound("اتاق گفتگو مورد نظر پیدا نشد");
    }
}

export const roomService = new RoomService();