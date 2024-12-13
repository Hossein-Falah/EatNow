import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.config";
import { ILocation } from "./support.interface";
import { User } from "../user/user.model";

export class Location extends Model<ILocation> implements ILocation {
    declare id?: string;
    declare senderId: string;
    declare location: {};
    declare dateTime: Date;
}

Location.init({
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
    location: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {}
    },
    dateTime: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    sequelize: sequelize,
    tableName: "locations",
    timestamps: true
});