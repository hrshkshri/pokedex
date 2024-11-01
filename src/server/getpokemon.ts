import { publicProcedure,router } from "./trpc";
import prisma from "~/app/utils/connect";
import { nullable, z } from "zod"; 
import { isNull } from "util";

export const getPokemonRoute = router({
    get: publicProcedure
    .input(z.object({name:z.string().nullable()}))
    .query(async (value)=>{
        if(!prisma){
            throw new Error("Prisma Client is not initiated")
        }
        if(value.input.name){
                return prisma.pokemon.findMany({
                    where:{
                         name:{
                            equals:value.input.name,
                            mode:"insensitive"
                         }
                    }
                   
                });
        }
    }),
})