import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.config";
import { User } from "../user/user.model";
import { IOrder } from "./order.interface";
import { Food } from "../food/food.model";

export class Order extends Model<IOrder> implements IOrder {
    declare id: string;
    declare userId: string;
    declare items: {
        foodId: string;
        quantity: number;
    }[];
    declare totalPrice: number;
    declare status: "PENDING" | "PREPARING" | "DELIVERED" | "CANCELED";
    declare address: string;
}

Order.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    items: {
        type: DataTypes.JSON,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: { msg: "جمع کل باید عدد اعشاری باشد" },
            min: { args: [0], msg: "جمع کل نمیتواند منفی باشد" }
        }
    },
    status: {
        type: DataTypes.ENUM("PENDING", "PREPARING", "DELIVERED", "CANCELED"),
        allowNull: false,
        defaultValue: "PENDING"
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelize,
    tableName: "orders",
    timestamps: true
});

User.hasMany(Order, { foreignKey: "userId", as: "orders" });
Order.belongsTo(User, { foreignKey: "userId", as: "user" });

Order.hasMany(Food, { foreignKey: "orderId", as: "foods" });
Food.belongsTo(Order, { foreignKey: "orderId", as: "orders" });
