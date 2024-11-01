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
import { FilterablePokedexTable } from "../_components/FilterablePokedexTable";


const Pokedex = () => { 
  return (
    <>
        <FilterablePokedexTable/>
    </>

  );
};
export default Pokedex;
