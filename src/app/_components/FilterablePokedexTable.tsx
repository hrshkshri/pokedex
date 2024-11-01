import React, { useEffect, useState } from "react";
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
    const [selectedType, setSelectedType] = useState<string |undefined>("");
    const pokemon2 = trpc.getType.get.useQuery<Pokemon[]>({type:selectedType},{
      enabled:false
    }); 
   
      useEffect(()=>{
        pokemon2.refetch();
      },[selectedType]);
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
