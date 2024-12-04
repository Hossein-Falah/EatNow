import { GraphQLEnumType, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export const CommentStatus = new GraphQLEnumType({
    name: "CommentStatus",
    values: {
        PENDING: { value: "PENDING" },
        APPROVED: { value: "APPROVED" },
        REJECTED: { value: "REJECTED" }
    }
})

export const CommentType = new GraphQLObjectType({
    name: "CommentType",
    fields: {
        id: { type: GraphQLString },
        content: { type: GraphQLString },
        authorId: { type: GraphQLString },
        parentId: { type: GraphQLString },
        foodId: { type: GraphQLString },
        status: { type: CommentStatus },
        like: { type: GraphQLInt },
        dislike: { type: GraphQLInt }
    }
});