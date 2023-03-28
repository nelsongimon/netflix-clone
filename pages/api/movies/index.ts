import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import serverAuth from "@/lib/serverAuth";

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET") {
		return res.status(405).end();
	}

	try {
		await serverAuth(req);
		const movies = await prisma.movie.findMany();
		res.status(200).json(movies);
	} catch (error) {
		console.log(error);
		res.status(400).end();
	}
}
