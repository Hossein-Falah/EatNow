import { DataTypes, Model } from "sequelize";
import { IMessage } from "./support.interface";
import sequelize from "../../config/db.config";
import { User } from "../user/user.model";
import { Room } from "./room.model";

export class Message extends Model<IMessage> implements IMessage {
    declare id?: string;
    declare senderId: string;
    declare message: string;
    declare dateTime: Date;
    declare roomId: string;
}

Message.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    senderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    dateTime: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    roomId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Room,
            key: "id"
        }
    }
}, {
    sequelize: sequelize,
    tableName: "messages",
    timestamps: true
});