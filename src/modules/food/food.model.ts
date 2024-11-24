import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.config";
import { IFood } from "./food.interface";
import { User } from "../user/user.model";

export class Food extends Model<IFood> implements IFood {
    declare id: string;
    declare title: string;
    declare description: string;
    declare content: string;
    declare category: "Fruits" | "Vegetables" | "Meat" | "Dessert" | "Drink";
    declare price: number;
    declare slug: string;
    declare quantity: number;
    declare images: string[];
    declare rating: number;
    declare readyTime: number;
    declare author: string;
    declare isStock: boolean;
};

Food.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: { msg: "عنوان غذا نباید خالی باشد" },
            len: { args: [3, 100], msg: "عنوان غذا باید بین 3 تا 100 کاراکتر باشد" }
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "توضیحات غذا نباید خالی باشد" },
            len: { args: [3, 500], msg: "توضیحات غذا باید بین 3 تا 500 کاراکتر باشد" }
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: "محتوای غذا نباید خالی باشد" }
        }
    },
    category: {
        type: DataTypes.ENUM("Fruits", "Vegetables", "Meat", 'Dessert', "Drink"),
        allowNull: false,
        validate: {
            notEmpty: { msg: "دسته بندی غذا نباید خالی باشد" },
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: { msg: "قیمت غذا نباید خالی باشد" }
        }
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "اسلاگ نمیتواند خالی باشد" }
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: { msg: "تعداد غذا نباید خالی باشد" }
        }
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: { msg: "امتیاز غذا نباید خالی باشد" }
        }
    },
    readyTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: { msg: "زمان آماده سازی غذا نباید خالی باشد" }
        }
    },
    author: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        },
        validate: {
            notEmpty: { msg: "نویسنده غذا نباید خالی باشد" }
        }
    },
    isStock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},{
    sequelize: sequelize,
    tableName: "foods",
    timestamps: true
});

Food.belongsTo(User, { foreignKey: "author", as: "user" });
User.hasMany(Food, { foreignKey: "author", as: "foods" });