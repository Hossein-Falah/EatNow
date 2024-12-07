export interface IBlog {
    id?: string;
    title: string;
    content: string;
    description: string;
    slug: string; 
    authorId: string;
    coverImage: string | null;
    categoryId: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    viewCount: number;
}