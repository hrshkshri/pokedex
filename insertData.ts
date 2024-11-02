import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

// Define interfaces for the API responses
interface PokemonApiResponse {
  name: string;
  url: string;
}

interface PokemonDetailsApiResponse {
  name: string;
  types: { type: { name: string } }[];
}

interface Pokemon {
  name: string;
  types: string[];
  sprite: string;
  img: string;
}

async function main() {
  // Fetch top 100 Pokémon from the PokéAPI
  const response = await axios.get<{ results: PokemonApiResponse[] }>(
    "https://pokeapi.co/api/v2/pokemon?limit=500"
  );

  const pokemonList = response.data.results;

  // Fetch details for each Pokémon and construct data
  const pokemonData: Pokemon[] = await Promise.all(
    pokemonList.map(async (pokemon) => {
      const pokemonDetailsResponse = await axios.get<PokemonDetailsApiResponse>(
        pokemon.url
      );
      const pokemonDetails = pokemonDetailsResponse.data;

      const types = pokemonDetails.types.map((type) => type.type.name);

      return {
        name: pokemonDetails.name,
        types: types,
        sprite: `https://img.pokemondb.net/sprites/home/normal/${pokemonDetails.name}.png`,
        img: `https://img.pokemondb.net/sprites/home/normal/${pokemonDetails.name}.png`,
      };
    })
  );

  // Insert data into the database
  for (const pokemon of pokemonData) {
    const existingPokemon = await prisma.pokemon.findUnique({
      where: { name: pokemon.name }, // Assuming name is the identifier
    });

    // Only create if the Pokémon does not already exist
    if (!existingPokemon) {
      await prisma.pokemon.create({ data: pokemon });
    }
  }

  console.log("Data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
