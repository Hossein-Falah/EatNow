import { GraphQLString } from "graphql";
import { IGraphQLContext } from "../graphql.context";
import { ResponseType } from "../types/response.types";
import { IBlog } from "../../modules/blog/blog.interface";
import { blogValidation } from "../../modules/blog/blog.validation";
import { adminGuardUseGraphQL } from "../../middlewares/guard/admin.guard";
import { Blog } from "../../modules/blog/blog.model";
import createHttpError from "http-errors";

const createBlog = {
    type: ResponseType,
    args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        content: { type: GraphQLString },
        slug: { type: GraphQLString },
        coverImage: { type: GraphQLString },
        categoryId: { type: GraphQLString },
        status: { type: GraphQLString }
    },
    resolve: async (_: {}, { title, description, slug, content, coverImage, categoryId, status }:IBlog, context: IGraphQLContext) => {
        try {
            const user = await adminGuardUseGraphQL(context.token);

            if (user) {
                await blogValidation.validateAsync({ title, description, slug, content, categoryId, status });
    
                await checkExistWithTitle(title);
                await checkExistWithSlug(slug);
    
                const createBlogResult = await Blog.create({
                    title, description, content,
                    slug, coverImage, categoryId,
                    status, authorId: user.id as string,
                    viewCount: 0
                });
                
                if (!createBlogResult) throw createHttpError.InternalServerError("خطایی در ایجاد بلاگ رخ داده است");

                return { success: true, error: false, message: "بلاگ با موفقعیت ساخته شد" };
            };
        } catch (error:unknown) {
            console.log(error);
            if (error instanceof Error) {
                return { success: false, error: true, message: error.message };
            }
        }
    }
};

const checkExistWithTitle = async (title: string): Promise<IBlog | null> => {
    const blog: IBlog | null = await Blog.findOne({ where: { title }});
    if (blog) throw createHttpError.Conflict("بلاگ با این نام قبلا ثبت شده است");
    return blog;
}

const checkExistWithSlug = async (slug: string) => {
    const blog: IBlog | null = await Blog.findOne({ where: { slug }});
    if (blog) throw createHttpError.Conflict("بلاگ با این نام قبلا ثبت شده است");
}

export {
    createBlog
}