import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.config";
import { User } from "../user/user.model";
import { Food } from "../food/food.model";

export class Comment extends Model {
    declare id?: string;
    declare content: string;
    declare authorId: string;
    declare parentId?: string | null;
    declare foodId: string;
    declare status: "PENDING" | "APPROVED" | "REJECTED";
    declare likes: number;
    declare dislikes: number;
}

Comment.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    authorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    parentId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: "comments",
            key: "id"
        }
    },
    foodId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "foods",
            key: "id"
        }
    },
    status: {
        type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
        allowNull: false,
        defaultValue: "PENDING"
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    dislikes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    }
},{
    sequelize: sequelize,
    tableName: "comments",
    timestamps: true
});

// Associations
Comment.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
Comment.belongsTo(Comment, { foreignKey: 'parentId', as: 'parent' });
Comment.belongsTo(Food, { foreignKey: 'foodId', as: 'food' });
