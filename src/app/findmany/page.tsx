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
import { ThreeCircles } from "react-loader-spinner";

type Pokemon = {
  id: number;
  name: string;
  types: string[];
  sprite: string;
  img: string;
};

const Pokedex = () => {
  const theme = createTheme();
  const [pokemon, setPokemon] = useState("");
  const [loading, setLoading] = useState(false);
  const [queryKey, setQueryKey] = useState<string>("");

  const pokemonQuery = trpc.getPokemonArray.get.useQuery<Pokemon[]>(
    queryKey.split(",").map((name) => name.trim()),
    {
      enabled: false,
    }
  );

  theme.typography.h3 = {
    fontSize: "1.5rem",
    "@media (min-width:600px)": {
      fontSize: "2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "3rem",
    },
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQueryKey(pokemon);
    setLoading(true);
  };

  useEffect(() => {
    if (queryKey) {
      pokemonQuery
        .refetch()
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error occurred:", error);
          setLoading(false);
        });
    }
  }, [queryKey, pokemonQuery]);

  const data = pokemonQuery.data;

  return (
    <>
      <Stack direction="column" spacing={20}>
        <Box
          sx={{
            position: "relative",
            top: "100px",
            width: "85vw",
            height: "auto",
          }}
          textAlign="center"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h3">Find Multiple Pokémon</Typography>
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
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                gap: "2rem",
              }}
            >
              <TextField
                value={pokemon}
                onChange={(e) => setPokemon(e.target.value)}
                placeholder='Enter Pokémon names separated by commas e.g., "Bulbasaur,Pikachu"'
                sx={{
                  width: {
                    xs: "100%",
                    sm: "40vw",
                  },
                }}
              />
              <Button
                variant="contained"
                type="submit"
                color="error"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </Box>
          </form>
        </Box>
        {loading && (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
        <Box
          sx={{
            width: "100%",
          }}
        >
          <PokedexTable names={data} />
        </Box>
      </Stack>
    </>
  );
};

export default Pokedex;
