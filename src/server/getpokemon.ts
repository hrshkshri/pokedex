import { publicProcedure, router } from "./trpc";
import prisma from "~/app/utils/connect";
import { z } from "zod";

export const getPokemonRoute = router({
  get: publicProcedure
    .input(z.object({ name: z.string().nullable() }))
    .query(async (value) => {
      console.log("this is the value", value);
      if (!prisma) {
        throw new Error("Prisma Client is not initiated");
      }
      // Allow fetching all Pokémon if the name is an empty string
      if (value.input.name) {
        const pokemons = await prisma.pokemon.findMany({
          where: {
            name: {
              contains: value.input.name, // Use 'contains' for partial matching
              mode: "insensitive",
            },
          },
          take: 10, // Limit results to 10
        });

        console.log("this is the pokemon", pokemons);
        return pokemons;
      } else {
        // Optionally, return a limited number of Pokémon if the name is an empty string
        const allPokemons = await prisma.pokemon.findMany({
          take: 10, // Limit results to 10
        });
        return allPokemons;
      }
    }),
});
