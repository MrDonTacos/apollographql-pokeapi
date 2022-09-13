import { Field, Int, ObjectType } from "type-graphql";

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