import { GraphQLList, GraphQLString } from "graphql";
import createHttpError from "http-errors";

import { ResponseType } from "../types/response.types";
import { IComment } from "../../modules/comment/comment.interface";
import { IGraphQLContext } from "../graphql.context";
import { authenticateUserWithGraphQL } from "../../middlewares/guard/authenticate.guard";
import { Food } from "../../modules/food/food.model";
import { Comment } from "../../modules/comment/comment.model";
import { IFood } from "../../modules/food/food.interface";
import { CommentType } from "../types/comment.types";
import { adminGuardUseGraphQL } from "../../middlewares/guard/admin.guard";

const createComment = {
    type: ResponseType,
    args: {
        content: { type: GraphQLString },
        parentId: { type: GraphQLString },
        foodId: { type: GraphQLString }
    },
    resolve: async (_:{}, { content, parentId, foodId }: IComment, context:IGraphQLContext) => {
        try {
            const user = await authenticateUserWithGraphQL(context.token);

            if (user && user.id) {                
                await checkExistFood(foodId);

                if (parentId) {
                    const comment = await checkExistComment(parentId);                    
                    
                    const newCommentResult = await Comment.create({
                        content,
                        authorId: user.id,
                        parentId: comment.id,
                        foodId,
                        status: "PENDING",
                        like: 0,
                        dislike: 0
                    });

                    if (!newCommentResult) throw createHttpError.InternalServerError("خطایی در ایجاد کامنت رخ داده");

                    return {
                        success: true,
                        error: false,
                        message: "کامنت با موفقعیت ثبت شد. پس از تایید نمایش داده میشود"
                    }
                }
    
                const newCommentResult = await Comment.create({
                    content,
                    authorId: user.id,
                    foodId,
                    status: "PENDING",
                    like: 0,
                    dislike: 0
                })

                if (!newCommentResult) throw createHttpError.InternalServerError("خطایی در ایجاد کامنت رخ داده");

                return {
                    success: true,
                    error: false,
                    message: "کامنت با موفقعیت ثبت شد. پس از تایید نمایش داده میشود"
                }
            }
            
        } catch (error) {
            if (error instanceof Error) {
                return { success: false, error: true, message: error.message };
            }
        }
    }
};

const getAllCommentsForAdmin = {
    type: new GraphQLList(CommentType),
    resolve: async (_:{}, args: {}, context:IGraphQLContext) => {
        try {
            await adminGuardUseGraphQL(context.token);
            
            const comments = await Comment.findAll();
            return comments
        } catch (error) {
            if (error instanceof Error) {
                return { success: false, error: true, message: error.message };
            }
        }
    }
}

const checkExistFood = async (id:string): Promise<IFood> => {
    const food = await Food.findByPk(id);
    if (!food) throw createHttpError.NotFound("غذای مورد نظر پیدا نشد");
    return food;
}

const checkExistComment = async (id:string): Promise<IComment> => {
    const comment = await Comment.findByPk(id);
    if (!comment) throw createHttpError.NotFound("کامنت مورد نظر پیدا نشد");
    return comment;
}

export {
    createComment,
    getAllCommentsForAdmin
}