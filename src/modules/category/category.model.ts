import { DataTypes, Model } from "sequelize";
import { ICategory } from "./category.interface";
import sequelize from "../../config/db.config";

export class Category extends Model<ICategory> implements ICategory {
    declare id: string;
    declare title: string;
    declare image: string
};

Category.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "عنوان دسته بندی نمی تواند خالی باشد" },
            len: { args: [3, 20], msg: "عنوان دسته بندی باید بین 3 تا 20 کاراکتر باشد" }
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelize,
    tableName: "categories",
    timestamps: true
})