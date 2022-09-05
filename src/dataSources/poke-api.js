import { RESTDataSource } from "apollo-datasource-rest";


class PokeAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://pokeapi.co/api/v2/'
    }
}

export default PokeAPI;