import { Router } from "express";
import SwaggerUi from "swagger-ui-express";
import swaggerApiDocument from "./swagger.json";

const swaggerRoute: Router = Router();

const swaggerOptions = { customCss: ".swagger-ui .topbar {display: none;}" };
swaggerRoute.use("/", SwaggerUi.serve);
swaggerRoute.get("/", SwaggerUi.setup(swaggerApiDocument, swaggerOptions));

export {
    swaggerRoute
}