import { GraphQLObjectType } from "graphql";
import { getAllCategories, getCategoryById, removeCategoryById } from "./resolvers/category.resolver";
import { createComment, getAllComment, getAllCommentsForAdmin } from "./resolvers/comment.resolver";

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getAllCategories,
        getCategoryById,
        getAllCommentsForAdmin,
        getAllComment
    }
})

const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {
        removeCategoryById,
        createComment
    }
});

export {
    RootQuery,
    RootMutation
}