"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { trpc } from "../_trpc/client";
import PokemonRow from "../_components/PokemonRow";
import { PokedexTable } from "../_components/PokedexTable";

type Pokemon = {
  id: number;
  name: string;
  types: string[];
  sprite: string;
  img:string;
};

const Pokedex = () => {
  const [pokemon, setPokemon] = useState("");
  const [queryKey, setQueryKey] = useState<string | null>(null);

  const handleSubmit= (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setQueryKey(pokemon);
  }
  const pokemon2 = trpc.getPokemonArray.get.useQuery<Pokemon[]>(queryKey?queryKey.split(","):[]);

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
    <Box
      sx={{
        position: "relative",
        top: "100px",
        width: "85vw",
        height:"auto"
      }}
      textAlign="center"
    >
      <Typography variant="h2">Find Multiple Pokemon</Typography>
      <form onSubmit={handleSubmit}>
      <Box
        textAlign="center"
        alignItems="center"
        sx={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <TextField
          value={pokemon}
          onChange={(e)=>setPokemon(e.target.value)}
          placeholder='Enter pokemon name eg:"Bulbasaur"'
          sx={{
            width: "40vw",
          }}
        />
        <Button variant="contained" type="submit" color="error">
          Search
        </Button>
      </Box>
        </form>
    </Box> 
    <Box sx={{
        width:"85vw"
    }}>
        <PokedexTable names={data}/>
    </Box>
    </Stack>
    </>

  );
};
export default Pokedex;
