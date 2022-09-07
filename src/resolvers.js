const resolvers = {
    Query: {
        allPokemons:  (_, {limit, offset}, {dataSources}) => {
            return dataSources.pokeAPI.getAllPokemon(limit, offset);
        }
    },
    PokemonResponse: {
        pokemonResource: ({results}) => results,
    },
    PokemonResource: {
        pokemon: ({name}, _, {dataSources}) => {
            return dataSources.pokeAPI.getPokemonByName(name)
        }
    },
    Pokemon: {
        image: ({sprites}) => sprites.front_default
    },
    PokemonAbility: {
        id: ({ability}) => ability.id,
        name: ({ability}) => ability.name
    }
}

module.exports = resolvers