import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";

export const ResponseType = new GraphQLObjectType({
  name: "ResponseType",
  fields: {
    success: { type: GraphQLBoolean },
    error: { type: GraphQLBoolean },
    message: { type: GraphQLString }
  }
});