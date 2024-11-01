"use client";
import React from "react";
import { Container, Grid } from "@mui/material";
import PokemonRow from "./PokemonRow";

type Pokemon = {
  id: number;
  name: string;
  types: string[];
  sprite: string;
  img: string;
};

// Define the type for the props
type PokedexTableProps = {
  names?: Pokemon[];
};

export const PokedexTable = ({ names }: PokedexTableProps) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingY: 4,
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 4 }}
        justifyContent="center"
      >
        {names?.map((value) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={value.id}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            gap={2}
          >
            <PokemonRow {...value} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
