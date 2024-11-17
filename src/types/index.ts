export type authType = {
    firstname: string;
    lastname: string;
    email: string;
    phone: number
    address: string;
}

export type verifyOTPType = {
    phone: number;
    otp: number;
}