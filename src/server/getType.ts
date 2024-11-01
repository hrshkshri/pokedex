import { publicProcedure,router } from "./trpc";
import prisma from "~/app/utils/connect";
import { z } from "zod"; 

export const getTypeRoute = router({
    get: publicProcedure
    .input(z.object({type:z.string()}))
    .query(async (value)=>{
        if(!prisma){
            throw new Error("Prisma Client is not initiated")
        }
        return prisma.pokemon.findMany({
            where:{
                types:{
                    has:value.input.type.toLowerCase(),
                }
            }
        })
    })
})