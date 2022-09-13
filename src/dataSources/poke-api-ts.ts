import { Pokemon } from "../classes/Pokemon";
import { RESTDataSource } from "apollo-datasource-rest"

export default class PokeAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://pokeapi.co/api/v2/'
    }

    getAllPokemon(limit = 20, offset = 0)
    {
        return this.get(`pokemon?limit=${limit}&offset=${offset}`)
    }

    async getPokemonByName(name): Promise<Pokemon>
    {
        console.log("Reach pokemon by name")
        return this.get(`pokemon/${name}`)
    }
}
