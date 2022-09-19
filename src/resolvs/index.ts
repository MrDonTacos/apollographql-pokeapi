import { AbilitiesResolver, PokemonResolver, PokemonResourceResolver, PokemonResponseResolver } from "./second-resolvers";
import { UserResolver } from "./user-resolver";

export const resolvers = [
    PokemonResponseResolver, 
    AbilitiesResolver, 
    PokemonResourceResolver, 
    PokemonResolver, 
    UserResolver] as const;