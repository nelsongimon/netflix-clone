import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import { PrismaClient } from "@prisma/client";

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
		const { movieId } = req.query;

		if (typeof movieId !== "string") {
			throw new Error("Invalid Id");
		}

		if (!movieId) {
			throw new Error("Missing Id");
		}

		const movies = await prisma.movie.findUnique({
			where: {
				id: movieId,
			},
		});

		if (!movieId) {
			throw new Error("Missing Id");
		}

		return res.status(200).json(movies);
	} catch (error) {
		console.log(error);
		return res.status(400).end();
	}
}
