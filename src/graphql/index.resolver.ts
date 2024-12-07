import { GraphQLObjectType } from "graphql";
import { getAllCategories, getCategoryById, removeCategoryById } from "./resolvers/category.resolver";
import { acceptComment, answerComment, createComment, getAllComment, getAllCommentsForAdmin, getCommentById, rejectComment, removeCommentById } from "./resolvers/comment.resolver";
import { createBlog, getAllBlogs, getAllBlogsForAdmin, removeBlogById } from "./resolvers/blog.resolver";

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getAllCategories,
        getCategoryById,
        getAllCommentsForAdmin,
        getAllComment,
        getCommentById,
        getAllBlogsForAdmin,
        getAllBlogs
    }
})

const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {
        removeCategoryById,
        createComment,
        removeCommentById,
        acceptComment,
        rejectComment,
        answerComment,
        createBlog,
        removeBlogById
    }
});

export {
    RootQuery,
    RootMutation
}