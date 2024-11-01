import { publicProcedure,router } from "./trpc";
import prisma from "~/app/utils/connect";
import { z } from "zod"; 

export const getPokemonArrayRoute = router({
    get: publicProcedure
    .input(z.array(z.string()))
    .query(async (value)=>{
        return prisma.pokemon.findMany({
            where:{
                name:{
                    in:value.input,
                    mode:"insensitive"
                }
            }
        })
    })
})