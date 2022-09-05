const { gql } = require("apollo-server")

const typeDefs = gql`
    type Query {
        allPokemons(limit: Int, offset: Int): PokemonResponse
    }

    type PokemonResponse {
        "Total number of Pokemons in the Database"
        count: Int
        "Url for next page of pokemons"
        next: String 
        "Url for previous page of pokemons"
        previous: String
        "List of Pokemons and their url ID"
        pokemonResource: [PokemonResource]
    }

    type PokemonResource {
        "Pokemons name"
        name: String
        "API Url to look for the pokemon"
        url: String
        "Pokemon's consulted via name"
        pokemon: Pokemon
    }

    type Pokemon {
        "Pokemon's ID"
        id: Int
        "Pokemon's name!"
        name: String
        "Pokemon's weight in KG."
        weight: Int
    }
`

module.exports = typeDefs;