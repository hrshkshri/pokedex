"use client";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { trpc } from "../_trpc/client";
import { PokedexTable } from "../_components/PokedexTable";
import { ThemeProvider } from "@emotion/react";

type Pokemon = {
  id: number;
  name: string;
  types: string[];
  sprite: string;
  img:string;
};



const Pokedex = () => {
    const theme = createTheme();
    const [pokemon, setPokemon] = useState("");
    const [queryKey, setQueryKey] = useState<string>("");
    const pokemon2 = trpc.getPokemonArray.get.useQuery<Pokemon[]>(queryKey.split(","),{
      enabled:false
    });

    theme.typography.h3 = {
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '2rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '3rem',
      },
    };


  const handleSubmit= (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setQueryKey(queryKey=>pokemon);

  }
  
  useEffect( ()=>{
    pokemon2.refetch().
    then(()=>{
      console.log("Data fetched successfully")
    })
    .catch((e)=>{
      console.log("error occured",e)
    })
  },[queryKey]);


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
        <ThemeProvider theme={theme}>
            <Typography variant="h3">Find Multiple Pokemon</Typography>
        </ThemeProvider>
      <form onSubmit={handleSubmit}>
      <Box
        textAlign="center"
        alignItems="center"
        sx={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection:{
            xs:'column',
            sm:'row'
          },
          gap: "2rem",
        }}
      >
        <TextField
          value={pokemon}
          onChange={(e)=>setPokemon(pokemon=>e.target.value)}
          placeholder='Enter pokemon name seperated by commas eg:"Bulbasaur,pikachu"'
          sx={{
            width:{
              xs:'100%',
              sm:'40vw',
            }
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
