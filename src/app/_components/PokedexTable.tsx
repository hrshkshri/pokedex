"use client"
import React from 'react'
import { Container, Grid } from "@mui/material";
import PokemonRow from "./PokemonRow"


type Pokemon = {
    id: number;
    name: string;
    types: string[];
    sprite: string;
    img: string;
  };
  
  // Define the type for the props
  type PokedexTableProps = {
    names?: Pokemon[],
  };
  
export const PokedexTable = ({names}:PokedexTableProps) => {

    return (
        <Container>
            <Grid container spacing={4}>
                {names?.map((value) => (
                    <Grid item xs={12} sm={3} key={value.id}>
                        <PokemonRow {...value}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

