import { Router } from "express";
import { nameSpaceController } from "./namespace.controller";

const supportRouter:Router = Router();

supportRouter.get(`/namespace`, nameSpaceController.getNamespaces);
supportRouter.post(`/namespace/create`, nameSpaceController.createNamespace);

export default supportRouter;