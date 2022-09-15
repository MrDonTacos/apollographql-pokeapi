import { ApolloServer } from "apollo-server-express";
import PokeAPI from './dataSources/poke-api-ts'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql';
import {PokemonResponseResolver, AbilitiesResolver, PokemonResourceResolver, PokemonResolver} from './resolvs/second-resolvers'
import { UserResolver } from "./resolvs/user-resolver";
import UserDataSource from './dataSources/UserDataSource'
import * as express from 'express'
import { customAuthChecker } from "./middleware/customAuthChecker";

async function bootstrap() 
{
    const app = express();
    const path = "/graphql";

    const schema = await buildSchema({
        resolvers: [PokemonResponseResolver, AbilitiesResolver ,PokemonResourceResolver, PokemonResolver, UserResolver],
        nullableByDefault: true,
        authChecker: customAuthChecker
    })

    const server = new ApolloServer({
        schema,
        dataSources: () => ({
            pokeApi: new PokeAPI()
        }),
        context: ({req}) => {
            const context = {
                req,
                user: req.user
            };
            return context
        }
    })

    server.applyMiddleware({app})

    UserDataSource.initialize()
    .then(() => {
        console.log("Connected to MySQL Poke Api DB")
    })
    .catch((data) => {
        console.log(data)
        console.error("Failed during init yo connect to MySQL Poke Api DB")
    })
    app.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}

bootstrap();