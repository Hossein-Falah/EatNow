import { Router } from "express";
import { nameSpaceController } from "./namespace.controller";
import { roomController } from "./room.controller";
import { uploadMiddleware } from "../../middlewares/uploader.middleware";

const supportRouter:Router = Router();

const uploadRoom = uploadMiddleware("room")

supportRouter.get(`/namespace`, nameSpaceController.getNamespaces);
supportRouter.post(`/namespace/create`, nameSpaceController.createNamespace);
supportRouter.get(`/rooms`, roomController.getAllRooms);
supportRouter.post(`/room/create`, uploadRoom.single("image"), roomController.createNewRoom);

export default supportRouter;