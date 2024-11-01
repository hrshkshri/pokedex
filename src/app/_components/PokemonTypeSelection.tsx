import { Typography, Box,TextField,Button } from "@mui/material";
import React, { useState } from "react";

type PokemonTypeSelectionProps = {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
};

export const PokemonTypeSelection = ({
  selectedType,
  selectType,
}: PokemonTypeSelectionProps) => {

    const [input,setInput] = useState<string>("");
    
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    selectType(input);
  };

  return (
    <>
    <Box
      sx={{
        position: "relative",
        top: "100px",
        width: "85vw",
        height:"auto"
      }}
      textAlign="center"
    >
        
      <Typography variant="h2">Find Pokemon By Type</Typography>
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
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          placeholder='Enter pokemon name by type eg:"Fire"'
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
    
    </>
  );
};
