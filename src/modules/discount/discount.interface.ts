export interface IDiscount {
    id?: string;
    title: string;
    description: string;
    code: string;
    value: number;
    startDate: Date;
    endDate: Date;
    usageLimit: number;
    usedCount: number;
    isActive: boolean;
}