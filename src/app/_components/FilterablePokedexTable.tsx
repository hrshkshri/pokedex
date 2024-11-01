import React, { useEffect, useState } from "react";
import { PokemonTypeSelection } from "./PokemonTypeSelection";
import { Box,Stack } from "@mui/material";
import { PokedexTable } from "./PokedexTable";
import { trpc } from "../_trpc/client";
import { ThreeCircles } from "react-loader-spinner";

type Pokemon = {
    id: number;
    name: string;
    types: string[];
    sprite: string;
    img:string;
  };
  

export const FilterablePokedexTable = () => {
    const [selectedType, setSelectedType] = useState<string |undefined>("");
    const [loading,setLoading] = useState(false);
    const pokemon2 = trpc.getType.get.useQuery<Pokemon[]>({type:selectedType},{
      enabled:false
    }); 
   
      useEffect( ()=>{
        pokemon2.refetch().
        then(()=>{
          console.log("Data fetched successfully");
          setLoading(false);
        })
        .catch((e)=>{
          console.log("error occured",e)
        })
      },[selectedType]);

      const data = pokemon2.data;
      console.log(data);
  return (
    <>
      <Stack direction="column" spacing={20}>
      <PokemonTypeSelection
        selectedType={selectedType}
        selectType={setSelectedType}
        setLoading={setLoading}
      />
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
      {data &&
      <Box
        sx={{
          width: "85vw",
        }}
      >
        <PokedexTable names={data} />
      </Box>
      }
    </Stack> 
    </>
  );
};
