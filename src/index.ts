import { ApolloServer } from "apollo-server";
import PokeAPI from './dataSources/poke-api-ts'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql';
import {PokemonResolver ,AbilitiesResolver} from './resolvs/second-resolvers'

async function bootstrap() 
{

    const schema = await buildSchema({
        resolvers: [PokemonResolver, AbilitiesResolver],
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