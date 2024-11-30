import * as categoryResolver from "./resolvers/category.resolver";

export const RootResolvers = {
    Query: {
        getAllCategories: categoryResolver.getAllCategories
    },
    Mutation: {}
}