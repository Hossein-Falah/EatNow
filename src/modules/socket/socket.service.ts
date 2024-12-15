import { Server, Socket } from "socket.io";
import { Conversation } from "../support/conversation.model";
import { Room } from "../support/room.model";
import { IConversation, IRoom } from "../support/support.interface";
import { MessageData } from "../../types";
import { Message } from "../support/message.model";

class SocketService {
    private io:Server;

    constructor(io:Server) {
        this.io = io
    }

    async initializeConnection() {
        this.io.on("connection", async (socket) => {
            try {
                const namespaces = await this.getNamespaces();
                socket.emit("namespaces", namespaces);
            } catch (error) {
                console.error(error);
                socket.emit("error", "faild to fetch namespaces.")
            }
        })
    }

    async getNamespaces() {
        const namespaces = await Conversation.findAll({
            include: [
                {
                    model: Room,
                    as: "rooms"
                }
            ]
        })

        return namespaces;
    }

    async createNamespacesConnection() {
        try {
            const namespaces = await this.getNamespaces();

            for(let namespace of namespaces) {
                this.io.of(`/${namespace.endpoint}`).on("connection", socket => {
                    this.handleNamespaceConnection(namespace, socket);
                })
            }
            
        } catch (error) {
            console.error("Error in createNamespacesConnection",error);
        }
    }

    async handleNamespaceConnection(namespace:Conversation, socket:Socket) {
        try {
            const conversation = await this.getConversation(namespace.endpoint);
            socket.emit("roomList", conversation?.rooms);

            socket.on(`joinRoom`, async (roomName:string) => {
                await this.handleRoomJoin(namespace.endpoint, roomName, socket, conversation?.rooms ?? []);
            })

            socket.on(`disconnect`, async () => {
                await this.updateOnlineUsersCount(namespace.endpoint);
            })
        } catch (error) {
            console.log("Error in handleNamespaceConnection", error);
            socket.emit("error", "Failed to connect to namespace");
        }
    }

    async getConversation(endpoint:string):Promise<IConversation | null> {
        const conversation: IConversation | null = await Conversation.findOne({
            where: { endpoint },
            include: [
                {
                    model: Room,
                    as: "rooms"
                }
            ]
        });

        return conversation;
    }

    async handleRoomJoin(endpoint:string, roomName:string, socket:Socket, rooms: IRoom[]):Promise<void> {
        const lastRoom = Array.from(socket.rooms)[1];

        if (lastRoom) {
            socket.leave(lastRoom);
            await this.updateOnlineUsersCount(endpoint, lastRoom);
        }

        socket.join(roomName);
        await this.updateOnlineUsersCount(endpoint, roomName);
        
        const roomInfo = rooms.find(room => room.name === roomName);
        socket.emit("roomInfo", roomInfo);
    }

    async updateOnlineUsersCount(endpoint:string, roomName?:string):Promise<void> {
        try {
            const onlineUsers = await this.io.of(`/${endpoint}`).in(roomName || "").allSockets();
            this.io.of(`/${endpoint}`).in(roomName || "").emit("countOfOnlineUsers", onlineUsers.size);
        } catch (error) {
            console.error("Error in updateOnlineUsersCount", error);
        }
    }

    registerMessageHandlers(socket:Socket):void {
        socket.on(`newMessage`, async (data:MessageData) => {
            await this.handleNewMessage(data);
        })
    }

    async handleNewMessage(data:MessageData):Promise<void> {
        try {
            const { message, endpoint, roomName, sender } = data;

            const conversation: IConversation | null = await Conversation.findOne({
                where: { endpoint },
                include: [{model: Room, as: "rooms", where: { name: roomName }}]
            });

            if (!conversation || !conversation.rooms || conversation.rooms.length === 0) {
                console.error("Room not found for the provided endpoint and room name.");
                return
            }

            const room = conversation.rooms[0];

            const newMessage = await Message.create({
                senderId: sender,
                message,
                dateTime: new Date(),
                roomId: room.id as string
            });

            this.io.of(`/${endpoint}`).in(roomName).emit("confirmMessage", {
                ...data,
                dateTime: newMessage.dateTime
            })
        } catch (error) {
            console.error("Error in handleNewMessage", error);
        }
    }
}

export default SocketService;