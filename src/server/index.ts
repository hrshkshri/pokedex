import {router} from "./trpc"
import { getPokemonRoute } from "./getpokemon";
import { getPokemonArrayRoute } from "./getPokemonArr";
import { getTypeRoute } from "./getType";

export const appRouter = router({
    getPokemon:getPokemonRoute,
    getPokemonArray:getPokemonArrayRoute,
    getType:getTypeRoute
})

export type AppRouter = typeof appRouter;