import { getSession } from "next-auth/client";
import { computeHints } from "../../helpers/computeHints";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface CreatePicrossRequest {
  grid: string[][];
  name: string;
}

export default async function createPicrossHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const body: CreatePicrossRequest = JSON.parse(req.body);
  const session = await getSession({ req });
  const solution = body.grid.map((row) => row.map((cell) => cell === "filled"));
  const hints = computeHints(solution);
  await prisma.picross.create({
    data: {
      name: body.name,
      author: { connect: { email: session?.user.email } },
      ...hints,
    },
  });
  res.end();
}
