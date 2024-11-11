"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const http_1 = __importDefault(require("http"));
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_config_1 = __importDefault(require("./config/db.config"));
const index_routes_1 = require("./routes/index.routes");
const swagger_routes_1 = require("./modules/api/swagger.routes");
class Application {
    constructor(PORT) {
        this.app = (0, express_1.default)();
        this.PORT = PORT;
        this.configuration();
        this.setupServer();
        this.setupDB();
        this.setupRoutes();
        this.errorHandling();
    }
    ;
    configuration() {
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static('public'));
    }
    ;
    setupServer() {
        const server = http_1.default.createServer(this.app);
        server.listen(this.PORT, () => {
            console.log(`✅ Server running on http://localhost:${this.PORT}/api-doc`);
        });
    }
    ;
    async setupDB() {
        try {
            await db_config_1.default.authenticate();
            console.log('✅ Database connection has been established successfully.');
            await db_config_1.default.sync({ alter: true });
            console.log('✅ All models were synchronized successfully.');
        }
        catch (error) {
            console.error(`❌ Database connection error: ${error}`);
        }
    }
    ;
    setupRoutes() {
        this.app.use("/api-doc", swagger_routes_1.swaggerRoute);
        this.app.use(index_routes_1.AllRoutes);
    }
    errorHandling() {
        this.app.use((req, res, next) => {
            next(http_errors_1.default.NotFound("آدرس مورد نظر یافت نشد"));
        });
        this.app.use((error, req, res, next) => {
            const serverError = http_errors_1.default.InternalServerError();
            const statusCode = error.statusCode || serverError.status;
            const message = error.message || serverError.message;
            res.status(statusCode).json({
                statusCode,
                errors: {
                    message
                }
            });
        });
    }
}
exports.Application = Application;
;
