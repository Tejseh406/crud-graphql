const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const MONGODB = "mongodb+srv://Tejeswarreddy:Tejatejeswar@cluster0.jjt0rwk.mongodb.net/?retryWrites=true&w=majority";


const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log("mongo db connection successful");
        return server.listen({port: 5000});
    })
    .then((res) => {
        console.log(`server is running at ${res.url}`);
    });