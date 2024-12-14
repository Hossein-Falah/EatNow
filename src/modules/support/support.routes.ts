import { Router } from "express";
import { nameSpaceController } from "./namespace.controller";
import { roomController } from "./room.controller";

const supportRouter:Router = Router();

supportRouter.get(`/namespace`, nameSpaceController.getNamespaces);
supportRouter.post(`/namespace/create`, nameSpaceController.createNamespace);
supportRouter.get(`/rooms`, roomController.getAllRooms);

export default supportRouter;