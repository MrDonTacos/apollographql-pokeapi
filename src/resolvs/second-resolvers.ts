import { Arg, Ctx, FieldResolver, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import {Pokemon, PokemonAbility}  from "../classes/Pokemon"
import { Context } from "../Context";

@Resolver()
export class PokemonResolver{    
    @Query(returns => Pokemon)
    async pokemon(@Arg("name") name: String, @Ctx() context: Context) {
        
        return await context.dataSources.pokeApi.getPokemonByName(name);
    }
}

@Resolver(of => PokemonAbility)
export class AbilitiesResolver implements ResolverInterface<PokemonAbility>{
    @FieldResolver()
    name(@Root() pokemonAbility: PokemonAbility)
    {   
        const {ability} = pokemonAbility;
        console.log(pokemonAbility)
        console.log(pokemonAbility.ability)
        return ability.name;
    }
}