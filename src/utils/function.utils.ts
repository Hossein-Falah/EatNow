type DataObject = Record<string, any>;

export const deleteInvalidPropertyObject = (data: DataObject = {}, blackList: any[] = []): void => {
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
}