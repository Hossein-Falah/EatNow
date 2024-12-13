import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.config";
import { ISupport } from "./support.interface";
import { Room } from "./room.model";
import { Message } from "./message.model";
import { Location } from "./location.model";

export class Conversation extends Model<ISupport> implements ISupport {
    declare id: string;
    declare title: string;
    declare endpoint: string;
};

Conversation.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endpoint: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelize,
    tableName: "converstations",
    timestamps: true
});

Room.hasMany(Message, { foreignKey: 'roomId', as: 'messages' });
Message.belongsTo(Room, { foreignKey: 'roomId' });

Room.hasMany(Location, { foreignKey: 'roomId', as: 'locations' });
Location.belongsTo(Room, { foreignKey: 'roomId' });

Conversation.hasMany(Room, { foreignKey: 'conversationId', as: 'rooms' });
Room.belongsTo(Conversation, { foreignKey: 'conversationId' });