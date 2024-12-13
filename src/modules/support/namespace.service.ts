import createHttpError from "http-errors";
import { Conversation } from "./conversation.model";
import { ISupport } from "./support.interface";

export class NameSpaceService {
    private model: typeof Conversation;

    constructor() {
        this.model = Conversation;
    }

    async createNamespace({ title, endpoint }:ISupport) {
        await this.checkExistWithEndpoint(endpoint);

        await this.model.create({ title, endpoint });
    }

    getNamespaces() {

    }

    async checkExistWithEndpoint(endpoint:string):Promise<void> {
        const namespaces = await this.model.findOne({ where: { endpoint } });
        if (namespaces) throw createHttpError.Conflict("قبلا همچین فضایی با این نام ساخته شده");
    }
}

export const nameSpaceService = new NameSpaceService();