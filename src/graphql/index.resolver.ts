import { GraphQLUpload } from "graphql-upload-ts";
import * as categoryResolver from "./resolvers/category.resolver";

export const RootResolvers = {
    Upload: GraphQLUpload,
    Query: {
        getAllCategories: categoryResolver.getAllCategories,
        getCategoryById: categoryResolver.getCategoryById
    },
    Mutation: {
        removeCategoryById: categoryResolver.removeCategoryById
    }
}