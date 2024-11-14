export interface IUser {
    id?: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: number;
    otp: number | null;
    otpExpiry: Date | null;
    address: string;
    latitude: number;
    longitude: number;
    role: "ADMIN" | "USER";
    cart: {
        food: string;
        quantity: number;
    }[];
    // orders: string[];
}