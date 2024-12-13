import { DataTypes, Model } from "sequelize";
import { IMessage } from "./support.interface";
import sequelize from "../../config/db.config";
import { User } from "../user/user.model";

export class Message extends Model<IMessage> implements IMessage {
    declare id?: string;
    declare senderId: string;
    declare message: string;
    declare dateTime: Date;
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
    }
}, {
    sequelize: sequelize,
    tableName: "messages",
    timestamps: true
});