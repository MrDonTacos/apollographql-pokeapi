import { ApolloServer } from "apollo-server";
import PokeAPI from './dataSources/poke-api-ts'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql';
import {PokemonResponseResolver, AbilitiesResolver, PokemonResourceResolver, PokemonResolver} from './resolvs/second-resolvers'
import { UserResolver } from "./resolvs/user-resolver";
import UserDataSource from './dataSources/UserDataSource'

async function bootstrap() 
{

    const schema = await buildSchema({
        resolvers: [PokemonResponseResolver, AbilitiesResolver ,PokemonResourceResolver, PokemonResolver, UserResolver],
        nullableByDefault: true
    })

    const server = new ApolloServer({
        schema,
        dataSources: () => ({
            pokeApi: new PokeAPI()
        })
    })

    server.listen().then(() => {
        console.log(`
        Listening on port 4000
        http://localhost:4000
        `)
    });

    UserDataSource.initialize()
    .then(() => {
        console.log("Connected to MySQL Poke Api DB")
    })
    .catch((data) => {
        console.log(data)
        console.error("Failed during init yo connect to MySQL Poke Api DB")
    })
}

bootstrap();