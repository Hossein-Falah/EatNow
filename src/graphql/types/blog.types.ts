import { GraphQLObjectType, GraphQLString } from "graphql";
import { CategoryType } from "./category.types";
import { UserType } from "./user.type";

export const BlogType = new GraphQLObjectType({
    name: "BlogType",
    fields: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        content: { type: GraphQLString },
        slug: { type: GraphQLString },
        coverImage: { type: GraphQLString },
        category: { type: CategoryType },
        status: { type: GraphQLString },
        author: { type: UserType },
        viewCount: { type: GraphQLString }
    }
})