const resolvers = {
    Query: {
        allPokemons:  (_, {limit, offset}, {dataSources}) => {
            return dataSources.pokeAPI.getAllPokemon(limit, offset);
        }
    },
    PokemonResponse: {
        pokemonResource: ({results}) => results
    },
    PokemonResource: {
        pokemon: ({name}, _, {dataSources}) => {
            return dataSources.pokeAPI.getPokemonByName(name)
        }
    }
}

module.exports = resolvers