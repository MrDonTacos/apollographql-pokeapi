const { ApolloServer } = require("apollo-server");
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const PokeAPI = require('./dataSources/poke-api')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            pokeAPI: new PokeAPI()
        }
    }
})

server.listen().then(() => {
    console.log(`
    Listening on port 4000
    http://localhost:4000
    `)
});