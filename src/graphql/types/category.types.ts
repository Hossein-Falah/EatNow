import { GraphQLObjectType, GraphQLString } from "graphql";

export const CategoryType = new GraphQLObjectType({
    name: "CategoryType",
    fields: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        image: { type: GraphQLString }
    }
});