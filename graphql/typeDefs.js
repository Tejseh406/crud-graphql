const { gql } = require("apollo-server");

module.exports = gql`
  type Recipe {
    id: ID
    name: String
    description: String
    createdAt: String
    thumbsUp: Int
    thumbsDown: Int
  }

  input RecipeInput{
    name: String
    description: String
  }

  type Query{
    recipe(id: ID!): Recipe!
    getRecipes(amount: Int): [Recipe]
  }

  type Mutation{
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(id: ID!): Boolean
    editRecipe(id: ID!,recipeInput: RecipeInput): Boolean
  }
`;