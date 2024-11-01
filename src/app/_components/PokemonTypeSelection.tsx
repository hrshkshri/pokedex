import { ThemeProvider } from "@emotion/react";
import { Typography, Box, TextField, Button, createTheme } from "@mui/material";
import React, { useState } from "react";

type PokemonTypeSelectionProps = {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
  setLoading:(type:boolean )=>void;
};

export const PokemonTypeSelection = ({
  selectedType,
  selectType,
  setLoading
}: PokemonTypeSelectionProps) => {
  const [input, setInput] = useState<string>("");
  const theme = createTheme();

  theme.typography.h3 = {
    fontSize: "1.5rem",
    "@media (min-width:600px)": {
      fontSize: "2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "3rem",
    },
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    selectType(input);
    setLoading(true);
  };

  return (
    <>
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
          <Typography variant="h3">Find Pokemon By Type</Typography>
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Enter pokemon type eg:"Fire"'
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
    </>
  );
};
