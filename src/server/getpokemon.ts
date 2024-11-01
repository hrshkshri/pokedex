import { publicProcedure,router } from "./trpc";
import prisma from "~/app/utils/connect";
import { z } from "zod"; 

export const getPokemonRoute = router({
    get: publicProcedure
    .input(z.object({name:z.string()}))
    .query(async (value)=>{
        if(!prisma){
            throw new Error("Prisma Client is not initiated")
        }
        return prisma.pokemon.findMany({
            where:{
                 name:{
                    equals:value.input.name,
                    mode:"insensitive"
                 }
            }
           
        });
    }),
})