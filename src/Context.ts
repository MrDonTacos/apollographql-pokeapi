import PokeAPI from "./dataSources/poke-api-ts";

export interface Context {
  dataSources: {
    pokeApi: PokeAPI;
  };
}