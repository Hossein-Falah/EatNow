import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.config";
import { IRoom } from "./support.interface";

export class Room extends Model<IRoom> implements IRoom {
    declare id: string;
    declare name: string;
    declare description: string;
    declare image: string;
}

Room.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: sequelize,
    tableName: "rooms",
    timestamps: true
})