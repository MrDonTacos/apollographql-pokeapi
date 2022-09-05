const { RESTDataSource } = require("apollo-datasource-rest")


class PokeAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://pokeapi.co/api/v2/'
    }

    getAllPokemon(limit = 20, offset = 0)
    {
        return this.get(`pokemon?limit=${limit}&offset=${offset}`)
    }

    getPokemonByName(name)
    {
        return this.get(`pokemon/${name}`)
    }
}

module.exports = PokeAPI;