import * as categoryTypes from "./types/category.types";
import * as responseTypes from "./types/response.types";

export const schema = `
    scalar Upload

    ${categoryTypes.Category}
    ${responseTypes.Response}

    type Query {
        getAllCategories: [Category]
        getCategoryById(id: String!): Category
    }
    type Mutation {
        _empty: String
    }
`;