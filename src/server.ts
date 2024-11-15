import http from "http";

import createHttpError from "http-errors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import sequelize from "./config/db.config";
import { AllRoutes } from "./routes/index.routes";
import { CustomError } from "./errors/customError";
import { swaggerRoute } from "./modules/api/swagger.routes";

export class Application {
    private app: express.Application
    private PORT: number;

    constructor(PORT:number) {
        this.app = express();
        this.PORT = PORT;
    
        this.configuration();
        this.setupServer();
        this.setupDB();
        this.setupRoutes();
        this.errorHandling();
    };

    private configuration() {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static('public'));
    };

    private setupServer() {
        const server = http.createServer(this.app);

        server.listen(this.PORT, () => {
            console.log(`✅ Server running on http://localhost:${this.PORT}/api-doc`);
        });
    };

    private async setupDB() {
        try {
            await sequelize.authenticate();
            console.log('✅ Database connection has been established successfully.');

            await sequelize.sync({ alter: true });
            console.log('✅ All models were synchronized successfully.');
        } catch (error) {
            console.error(`❌ Database connection error: ${error}`);
        }
    };

    private setupRoutes() {
        this.app.use("/api-doc", swaggerRoute);
        this.app.use(AllRoutes);
    }

    private errorHandling() {
        this.app.use((req:Request, res:Response, next:NextFunction) => {
            next(createHttpError.NotFound("آدرس مورد نظر یافت نشد"));
        });

        this.app.use((error: CustomError, req:Request, res:Response, next:NextFunction) => {
            const serverError = createHttpError.InternalServerError();
            const statusCode = error.statusCode || serverError.status;
            const message = error.message || serverError.message;

            res.status(statusCode).json({ 
                statusCode,
                errors: {
                    message
                }
            }); 
        })
    }
};