import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.config";
import { ISupport } from "./support.interface";

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