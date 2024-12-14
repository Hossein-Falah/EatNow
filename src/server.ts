import http from "http";

import { GraphQLSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import createHttpError from "http-errors";
import { Server } from "socket.io";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import sequelize from "./config/db.config";
import { AllRoutes } from "./routes/index.routes";
import { CustomError } from "./errors/customError";
import { swaggerRoute } from "./modules/api/swagger.routes";
import { RootMutation, RootQuery } from "./graphql/index.resolver";
import SocketService from "./modules/socket/socket.service";

export class Application {
    private app: express.Application
    private PORT: number;

    constructor(PORT:number) {
        this.app = express();
        this.PORT = PORT;
    
        this.configuration();
        this.setupGraphQLServer();
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
        this.app.use(cookieParser());
        this.app.use(express.static('public'));
    };

    private async setupGraphQLServer() {
        const schema = new GraphQLSchema({
            query: RootQuery,
            mutation: RootMutation
        });

        this.app.use(`/graphql`, createHandler({
            schema, 
            context: async (req:any, res) => {
                const authorization = req.headers['authorization']?.split(" ")[1];
                return { req, res, token: authorization };
            }
        }));
    }

    private setupServer() {
        const server = http.createServer(this.app);
        const io = new Server(server, {
            cors: {
                origin: "http://localhost:8000",
                methods: ["GET", "POST"]
            }
        });
        const socketService = new SocketService(io);
        socketService.initializeConnection();

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