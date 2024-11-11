"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerRoute = void 0;
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const swaggerRoute = (0, express_1.Router)();
exports.swaggerRoute = swaggerRoute;
const swaggerOptions = { customCss: ".swagger-ui .topbar {display: none;}" };
swaggerRoute.use("/", swagger_ui_express_1.default.serve);
swaggerRoute.get("/", swagger_ui_express_1.default.setup(swagger_json_1.default, swaggerOptions));
