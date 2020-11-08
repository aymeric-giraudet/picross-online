import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Middleware } from "next-connect";

export interface PrismaApiRequest extends NextApiRequest {
  prisma: PrismaClient;
}

const prismaMiddleware: Middleware<PrismaApiRequest, NextApiResponse> = async (
  req,
  _,
  next
) => {
  const prisma = new PrismaClient();
  req.prisma = prisma;
  next();
  req.prisma.$disconnect();
};

export default prismaMiddleware;
