import path from "path";
import fs from "fs";

interface File {
    path: string;
}

type DataObject = Record<string, any>;

const deleteInvalidPropertyObject = (data: DataObject = {}, blackList: any[] = []): void => {
    const nullList = [undefined, null, "", " ", NaN, 0, false];

    Object.keys(data).forEach((key: string) => {
        if (blackList.includes(data[key])) {            
            Reflect.deleteProperty(data, key);
        } else if (typeof data[key] === "string") {
            data[key] = data[key].trim();
            if (nullList.includes(data[key])) {
                Reflect.deleteProperty(data, key); 
            } 
        } else if (nullList.includes(data[key])) {
            Reflect.deleteProperty(data, key); 
        }
    })
};

const deleteImageFile = async (fileAddress: string | string[]) => {
    const pathFile = Array.isArray(fileAddress)
        ? fileAddress.map(address => path.join(__dirname, "..", "..", address))
        : [path.join(__dirname, "..", "..", fileAddress)];

    const deletePromises = pathFile.map(async pathFile => {
        if (fs.existsSync(pathFile)) {
            try {
                await fs.promises.unlink(pathFile);
            } catch (error) {
                console.error(`Error with file: ${pathFile}`, error);
            }
        }
    });

    await Promise.all(deletePromises);
};

const getListOfImages = (files: File[] = [], folder: string, basePath:string = "") => {
    return files
        .filter(file => Boolean(file && file.path))
        .map(file => {
            const originalName = file.path.replace(/\\/g, "/").split("/");
            return `${basePath}/uploads/${folder}/${originalName[originalName.length - 1]}`;
        })
}

export {
    deleteInvalidPropertyObject,
    getListOfImages,
    deleteImageFile
}