export interface IComment {
    id?: string;
    content: string;
    authorId: string;
    parentId?: string | null;
    foodId: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    like: number;
    dislike: number;
}
