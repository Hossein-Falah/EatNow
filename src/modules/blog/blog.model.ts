import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.config";
import { IBlog } from "./blog.interface";

export class Blog extends Model<IBlog> implements IBlog {
    declare id?: string;
    declare title: string;
    declare content: string;
    declare description: string;
    declare slug: string;
    declare authorId: string;
    declare coverImage: string | null;
    declare categoryId: string;
    declare status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    declare viewCount: number;
};

Blog.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    authorId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    coverImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("DRAFT", "PUBLISHED", "ARCHIVED"),
        defaultValue: "DRAFT",
        allowNull: false
    },
    viewCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
}, {
    sequelize: sequelize,
    tableName: "blogs",
    timestamps: true
});