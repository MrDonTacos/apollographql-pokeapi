import { ApolloServer } from "apollo-server-express";
import PokeAPI from './dataSources/poke-api-ts'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql';
import {resolvers} from './resolvs/index'
import UserDataSource from './dataSources/UserDataSource'
import * as express from 'express'
import { customAuthChecker } from "./middleware/customAuthChecker";
import CustomContext from "./middleware/customContext";
import * as jwt from 'jsonwebtoken'
import {Container} from 'typedi'

async function bootstrap() 
{
    const app = express();
    const path = "/graphql";

    const schema = await buildSchema({
        resolvers,
        nullableByDefault: true,
        authChecker: customAuthChecker,
        container: Container
    })

    const server = new ApolloServer({
        schema,
        dataSources: () => ({
            pokeApi: new PokeAPI()
        }),
        context: ({req}) => {
            const context = {
                body: req.body,
                user: req.headers
            };
            return context
        }
    })

    app.use(path, express.json())


    await server.start();
    server.applyMiddleware({app, path})

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