"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { trpc } from "../_trpc/client";
import PokemonRow from "../_components/PokemonRow";
import { ThemeProvider } from "@emotion/react";
import { ThreeCircles } from 'react-loader-spinner';

type Pokemon = {
  id: number;
  name: string;
  types: string[];
  sprite: string;
  img:string;
};

const Pokedex = () => {
  const [pokemon, setPokemon] = useState("");
  const [queryKey, setQueryKey] = useState("");
  const [loading,setLoading] = useState(false);
  const theme = createTheme();
  const pokemon2 = trpc.getPokemon.get.useQuery<Pokemon[]>({ name: queryKey },{
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
    setLoading(true);
  }
  
  useEffect(()=>{
    pokemon2.refetch()
    .then(()=>{
      console.log("Data fetched successfully")
      setLoading(false);
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
          <Typography variant="h3">Find Pokemon</Typography>
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
              placeholder='Enter pokemon name eg:"Bulbasaur"'
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
        {loading && (
          <Box
            sx={{
              width:"100%",
              height:"100%",
              display:"flex",
              justifyContent:"center",
              alignItems:"center"
            }}
          >
          <ThreeCircles
              visible={true}
              height="100"
              width="100"
              color="red"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
          />
          </Box>
        )}
        {data?.map((value:Pokemon) => {    
          return(
            <Box 
            paddingY={3}
            sx={{
              width:"85vw",
              
            }} key={value.id}>
          <Container>
            <Grid container direction="row" justifyContent="center" spacing={2}>
              <Grid item xs={12} sm={3} key={value.id}>
                <PokemonRow {...value}/>
              </Grid>
            </Grid>
          </Container>
          </Box>
          )
      })}
      </Stack>
    </>

  );
};
export default Pokedex;
