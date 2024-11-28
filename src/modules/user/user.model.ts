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
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: { msg: "شماره همراه اجباری می باشد" },
            isNumeric: { msg: "شماره همراه نامعتبر است" },
            len: [10, 11]
        }
    },
    otp: {
        type: DataTypes.INTEGER,
        allowNull: true  
    },
    otpExpiry: {
        type: DataTypes.DATE,
        allowNull: true  
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true  
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM("ADMIN", "USER"),
        allowNull: false,
        defaultValue: "USER"
    },
    cart: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    }
}, {
    sequelize: sequelize,
    tableName: "users",
    timestamps: true
});