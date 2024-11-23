import fs from "fs";
import path from "path";

import multer from "multer";
import { Request } from "express";
import createHttpError from "http-errors";

const ensureDirectoryExistence = (dir:string) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });        
    }
}

const uploadMiddleware = (destinationPath: string) => {
    const storage = multer.diskStorage({
        destination: (req: Request, file: Express.Multer.File, cb:Function) => {
            const uploadPath = path.join(__dirname, "../../public/uploads", destinationPath);

            ensureDirectoryExistence(uploadPath);

            cb(null, uploadPath);
        },
        filename: (req: Request, file: Express.Multer.File, cb:Function) => {
            const unique = Date.now() + "-" + Math.round(Math.random() * 1E9);
            const ext = path.extname(file.originalname);
            cb(null, `${unique}${ext}`);
        }
    });

    const fileFilter = (req:Request, file: Express.Multer.File, cb:Function) => {
        const ext = path.extname(file.originalname);
        const types = ['.png', '.jpg', '.jpeg', '.svg'];
        
        if (types.includes(ext)) {
            return cb(null, true);    
        };

        return cb(createHttpError.BadRequest("فرمت عکس مجاز نمی باشد"));
    };

    const pictureMaxSize = 5 * 1024 * 1024; // 5MB limit max size

    return multer({
        storage,
        limits: { fileSize: pictureMaxSize },
        fileFilter
    })
}

export {
    uploadMiddleware
}