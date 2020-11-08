import { NextApiResponse } from "next";
import nc from "next-connect";
import prismaMiddleware, { PrismaApiRequest } from "./prisma";
import sessionMiddleware, { SessionApiRequest } from "./session";

interface MiddlewareApiRequest extends PrismaApiRequest, SessionApiRequest {}

export default nc<MiddlewareApiRequest, NextApiResponse>()
  .use(sessionMiddleware)
  .use(prismaMiddleware);
