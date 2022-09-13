import { Field, ID, Int, ObjectType } from "type-graphql";


@ObjectType()
export class Pokemon {
    "Pokemon's ID"
    @Field(type => Int)
    id: number
    "Pokemon's name!"
    @Field()
    name: String
    "Pokemon's weight in hectograms."
    @Field()
    weight: number
    "Pokemon's front default sprite"
    @Field()
    image: String
    "Pokemon's height in decimetres"
    @Field()
    height: number
    "A list of abilities this pokemon probably has "
    @Field(type => [PokemonAbility])
    abilities: PokemonAbility[]
}

@ObjectType()
export class PokemonResource {
    "Pokemons name"
    @Field()
    name: String
    "API Url to look for the pokemon"
    @Field()
    url: String
    "Pokemon's consulted via name"
    @Field()
    pokemon: Pokemon
}

@ObjectType()
export class PokemonResponse {
    "Total number of Pokemons in the Database"
    @Field(type => ID)
    count: number
    "Url for next page of pokemons"
    @Field()
    next: String 
    "Url for previous page of pokemons"
    @Field()
    previous: String
    "List of Pokemons and their url ID"
    @Field(type => [PokemonResource], {name: "pokemonResource"})
    results : PokemonResource[]
}

@ObjectType() 
export class PokemonAbility {
    "Pokemon's ability name"
    @Field({nullable: true})
    name: String
    ability: Ability
}

@ObjectType()
export class Ability {
    name: String
}