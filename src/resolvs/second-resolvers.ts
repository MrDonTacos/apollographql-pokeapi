import { Arg, Args, Ctx, Field, FieldResolver, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { skipTakeArgs } from "../classes/helpers/skip-take";
import {Pokemon, PokemonAbility, PokemonResource, PokemonResponse}  from "../classes/Pokemon"
import { Context } from "../Context";

@Resolver(() => PokemonResponse)
export class PokemonResponseResolver{   
    @Query(returns => PokemonResponse, {description: "A query designed to retreive a list of pokemons based on skip/limit"})
    async allPokemons(@Args() {limit, offset}: skipTakeArgs, @Ctx() context: Context) {
        const result = await context.dataSources.pokeApi.getAllPokemon(limit, offset);
        return await context.dataSources.pokeApi.getAllPokemon(limit, offset);
    }
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
        return ability.name;
    }
}

@Resolver(of => PokemonResource)
export class PokemonResourceResolver implements ResolverInterface<PokemonResource>{
    @FieldResolver()
    async pokemon(@Root() {name}: PokemonResource, @Ctx() context: Context): Promise<Pokemon>
    {
        return await context.dataSources.pokeApi.getPokemonByName(name)
    }
}

@Resolver(of => Pokemon)
export class PokemonResolver implements ResolverInterface<Pokemon> {
    @FieldResolver()
    image(@Root() {sprites}: any): String {
        return sprites.front_default;
    }  
}