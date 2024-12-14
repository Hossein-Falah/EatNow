import { Room } from "./room.model";
import { IRoom } from "./support.interface";

export class RoomService {
    private model: typeof Room;

    constructor() {
        this.model = Room
    }

    async getAllRooms():Promise<IRoom[]> {
        const rooms = await this.model.findAll();
        return rooms       
    }
}

export const roomService = new RoomService();