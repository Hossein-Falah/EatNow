import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export const DiscountType = new GraphQLObjectType({
    name: "DiscountType",
    fields: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        code: { type: GraphQLString },
        value: { type: GraphQLInt },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
        usageLimit: { type: GraphQLInt },
        usedCount: { type: GraphQLInt },
        isActive: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    }
});