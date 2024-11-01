"use client";
import React from "react";
import { trpc } from "../_trpc/client";
import { Paper, Box, Typography, Button } from "@mui/material";
import Link from "next/link";

interface Props{
  id:number,
  name:string,
  types:string[],
  sprite:string,
  img:string
}
const PokemonRow = (props:Props) => {

  return (
    <Paper elevation={12} square={false}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={props.img}
                width={200}
                height={200}
              />
            </Box>
            <Box paddingX={3}
            paddingY={1}>
              <Typography variant="body1">Name: {props.name}</Typography>
              <Typography variant="body1">Types: {props.types.map(type=>type+",")}</Typography>
            </Box>
            <Box 
            textAlign="center"
            paddingY={2}
            >
              <Link href={props.sprite}>
              <Button variant="contained" color="error">Sprite</Button>
              </Link>
            </Box>
          </Paper>
  );
};
//why pokemon2 is the data returned by trpc api by prisma findmany method but when I do pokemon2.data it is of type object rather than array?
export default PokemonRow;
