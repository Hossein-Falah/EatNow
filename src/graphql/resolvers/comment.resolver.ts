import { GraphQLList, GraphQLString, responsePathAsArray } from "graphql";
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
import { resolve } from "path";
import { error } from "console";

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

const getAllComment = {
    type: new GraphQLList(CommentType),
    resolve: async (_:{}, args: {}, context:IGraphQLContext) => {
        try {
            const comments = await Comment.findAll({ where: { status: "APPROVED" } });
            return comments;
        } catch (error) {
            if (error instanceof Error) {
                return { success: false, error: true, message: error.message };
            }
        }
    }
}

const getCommentById = {
    type: CommentType,
    args: {
        id: { type: GraphQLString }
    },
    resolve: async (_:{}, { id }: { id: string }, context:IGraphQLContext) => {
        try {
            await adminGuardUseGraphQL(context.token);
            const comment = await Comment.findByPk(id);
            return comment;
        } catch (error) {
            if (error instanceof Error) {
                return { success: false, error: true, message: error.message };
            }
        }
    }
}

const removeCommentById = {
    type: ResponseType,
    args: {
        id: { type: GraphQLString }
    },
    resolve: async (_:{}, { id }: { id: string }, context:IGraphQLContext) => {
        try {
            await adminGuardUseGraphQL(context.token);

            const comment = await Comment.findByPk(id);
            if (!comment) throw createHttpError.NotFound("کامنت مورد نظر پیدا نشد");

            if (comment) {
                await comment.destroy();
                return { success: true, error: false, message: "کامنت با موفقعیت حذف شد" };
            }
        } catch (error) {
            if (error instanceof Error) {
                return { success: false, error: true, message: error.message };
            }
        }
    }
}

const acceptComment = {
    type: ResponseType,
    args: {
        id: { type: GraphQLString }
    },
    resolve: async (_:{}, { id }: { id: string }, context:IGraphQLContext) => {
        try {
            await adminGuardUseGraphQL(context.token);

            const comment = await checkExistComment(id);

            if (comment) {
                const updateComment = await Comment.update({ status: "APPROVED" }, { where: { id } });
                if (!updateComment[0]) throw createHttpError.InternalServerError("خطایی در تایید کامنت رخ داده");

                return { success: true, error: false, message: "کامنت با موفقعیت تایید شد" };
            }
        } catch(error) {
            if (error instanceof Error) {
                return { success: false, error: true, message: error.message };
            }
        }
    }
}

const rejectComment = {
    type: ResponseType,
    args: {
        id: { type: GraphQLString }
    },
    resolve: async (_:{}, { id }: { id: string }, context:IGraphQLContext) => {
        try {
            await adminGuardUseGraphQL(context.token);

            const comment = await checkExistComment(id);

            if (comment) {
                const updateComment = await Comment.update({ status: "REJECTED" }, { where: { id } });
                if (!updateComment[0]) throw createHttpError.InternalServerError("خطایی در رد کامنت رخ داده");

                return { success: true, error: false, message: "کامنت با موفقعیت رد شد" };
            }
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
    getAllCommentsForAdmin,
    getAllComment,
    getCommentById,
    removeCommentById,
    acceptComment,
    rejectComment
}