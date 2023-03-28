import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse) 
{
    if(req.method !== 'GET') {
        res.status(405).end();
    }
    try {
        const currentUser = await serverAuth(req); 
        const movieCount = await prisma.movie.count();
        const randomIndex = Math.floor(Math.random() * movieCount);
        const randomMovies = await prisma.movie.findMany({
            take: 1,
            skip: randomIndex,
        });
        
        return res.status(200).json(randomMovies[0]);
    } catch (error) {
        return res.status(400).end();
    }

}