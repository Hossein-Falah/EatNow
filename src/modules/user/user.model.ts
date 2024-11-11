import { DataTypes, Model } from "sequelize";
import { IUser } from "./user.interface";
import sequelize from "../../config/db.config";

export class User extends Model<IUser> implements IUser {
    declare id?: string;
    declare firstname: string;
    declare lastname: string;
    declare email: string;
    declare phone: number;
    declare otp: number;
    declare otpExpiry: Date;
    declare address: string;
    declare latitude: number;
    declare longitude: number;
    declare role: "ADMIN" | "USER";
    declare cart: { 
        food: string;
        quantity: number
    }[];
    declare orders: string[];
};

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "نام اجباری می باشد" },
            len: [2, 20]
        }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "نام خانوادگی اجباری می باشد" },
            len: [2, 20]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: { msg: "ایمیل اجباری می باشد" },
            isEmail: { msg: "ایمیل نامعتبر است" },
            is: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        }
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: { msg: "شماره همراه اجباری می باشد" },
            isNumeric: { msg: "شماره همراه نامعتبر است" },
            len: [11, 11]
        }
    },
    otp: {
        type: DataTypes.INTEGER,
        allowNull: false  
    },
    otpExpiry: {
        type: DataTypes.DATE,
        allowNull: false  
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false  
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("ADMIN", "USER"),
        allowNull: false
    },
    cart: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    orders: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: true,
        references: {
            model: "order",
            key: "id"
        },
        defaultValue: []
    }
}, {
    sequelize: sequelize,
    modelName: "user",
    timestamps: true
});