import React, { useState } from "react";
import { PokemonTypeSelection } from "./PokemonTypeSelection";
import { Box,Stack } from "@mui/material";
import { PokedexTable } from "./PokedexTable";
import { trpc } from "../_trpc/client";

type Pokemon = {
    id: number;
    name: string;
    types: string[];
    sprite: string;
    img:string;
  };
  

export const FilterablePokedexTable = () => {
    const [selectedType, setSelectedType] = useState<string | undefined>();
    const pokemon2 = trpc.getType.get.useQuery<Pokemon[]>(selectedType?{type:selectedType}:{type:""}); 
    if (pokemon2.isLoading) {
        return <div>Loading...</div>;
      }
    
      if (pokemon2.error) {
        return <div>An error has occurred: {pokemon2.error.message}</div>;
      }
      const data = pokemon2.data;
      console.log(data);
  return (
    <>
      <Stack direction="column" spacing={20}>
      <PokemonTypeSelection
        selectedType={selectedType}
        selectType={setSelectedType}
      />
      {data &&
      <Box
        sx={{
          width: "85vw",
        }}
      >
        <PokedexTable names={data} />
      </Box>
      }
    </Stack> 
    </>
  );
};
