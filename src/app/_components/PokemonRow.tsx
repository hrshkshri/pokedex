"use client";
import React from "react";
import { Paper, Box, Typography, Button } from "@mui/material";
import Link from "next/link";

interface Props {
  id: number;
  name: string;
  types: string[];
  sprite: string;
  img: string;
}

const PokemonRow = (props: Props) => {
  return (
    <Paper
      elevation={8}
      square={false}
      sx={{
        margin: 3,
        padding: 3,
        minWidth: { xs: "100%", sm: "250px" },
        maxWidth: "300px",
        borderRadius: 3,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 2,
        }}
      >
        <img
          src={props.img}
          alt={`${props.name} image`}
          width={120}
          height={120}
          style={{
            borderRadius: "50%",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
          }}
        />
      </Box>
      <Box paddingX={1} paddingY={1} textAlign="center">
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {props.name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            backgroundColor: "#f1f1f1",
            padding: "4px 8px",
            borderRadius: "8px",
            display: "inline-block",
          }}
        >
          Types: {props.types.join(", ")}
        </Typography>
      </Box>
      <Box textAlign="center" paddingY={2}>
        <Link href={props.sprite} passHref>
          <Button variant="contained" color="error" sx={{ borderRadius: 8 }}>
            View Sprite
          </Button>
        </Link>
      </Box>
    </Paper>
  );
};

export default PokemonRow;
