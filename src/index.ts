import { ApolloServer } from "apollo-server";
import PokeAPI from './dataSources/poke-api-ts'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql';
import {PokemonResponseResolver, AbilitiesResolver, PokemonResourceResolver, PokemonResolver} from './resolvs/second-resolvers'
import { UserResolver } from "./resolvs/user-resolver";


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
}

bootstrap();