import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.config";
import { IDiscount } from "./discount.interface";

export class Discount extends Model<IDiscount> implements IDiscount {
    declare id?: string;
    declare title: string;
    declare description: string;
    declare code: string;
    declare value: number;
    declare startDate: Date;
    declare endDate: Date;
    declare usageLimit: number;
    declare usedCount: number;
    declare isActive: boolean;
}

Discount.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    usageLimit: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    usedCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: sequelize,
    tableName: "discounts",
    timestamps: true
});