const Recipe = require('../models/Recipe');

module.exports = {
    Query: {
        async recipe(_,{id}){
            return await Recipe.findById(id);
        },

        async getRecipes(_,{amount}){
            return await Recipe.find().sort({ createdAt: -1 }).limit(amount)
        }
    },
    Mutation: {
        async createRecipe(_,{recipeInput: {name, description}}){
            const createRecipe = new Recipe({
                name: name,
                description: description,
                createdAt: new Date().toISOString(),
                thumbsUp: 0,
                thumbsDown: 0
            })

            const res = await createRecipe.save();  //MongoDb Saving
            console.log(res._doc)
            return {
                id: res.id,
                ...res._doc
            }
        },
        async deleteRecipe(_,{id}){
            const wasDeleted = (await Recipe.deleteOne({_id:id})).deletedCount
            return wasDeleted;  // if is it 1 - true else 0- false
        },
        
        async editRecipe(_,{id,recipeInput: {name, description}}){
            const wasEdited = (await Recipe.updateOne({_id:id},{name: name,description: description})).modifiedCount;
            return wasEdited;  //1 if something was edited; 0 if nothing was edited
        }
    }
}