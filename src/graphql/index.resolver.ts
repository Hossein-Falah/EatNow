import { GraphQLObjectType } from "graphql";
import { getAllCategories, getCategoryById, removeCategoryById } from "./resolvers/category.resolver";
import { acceptComment, answerComment, createComment, getAllComment, getAllCommentsForAdmin, getCommentById, rejectComment, removeCommentById } from "./resolvers/comment.resolver";
import { createBlog, getAllBlogs, getAllBlogsForAdmin, getBlogById, removeBlogById, updateBlog } from "./resolvers/blog.resolver";
import { createDiscount, deleteDiscount, getAllDiscounts } from "./resolvers/discount.resolver";

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getAllCategories,
        getCategoryById,
        getAllCommentsForAdmin,
        getAllComment,
        getCommentById,
        getAllBlogsForAdmin,
        getAllBlogs,
        getBlogById,
        getAllDiscounts
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
        removeBlogById,
        updateBlog,
        createDiscount,
        deleteDiscount
    }
});

export {
    RootQuery,
    RootMutation
}