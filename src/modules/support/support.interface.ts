export interface ISupport {
    id?: string;
    title: string;
    endpoint: string;
}

export interface IRoom {
    id?: string;
    name: string;
    description: string;
    image: string;
    conversationId?: string;
}

export interface ILocation {
    id?: string;
    senderId: string;
    location: {};
    dateTime: Date;
}

export interface IMessage {
    id?: string;
    senderId: string;
    message: string;
    dateTime: Date;
}