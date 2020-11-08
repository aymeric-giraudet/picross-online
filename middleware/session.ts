import { getSession, Session } from "next-auth/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Middleware } from "next-connect";

export interface SessionApiRequest extends NextApiRequest {
  session: Session;
}

const sessionMiddleware: Middleware<
  SessionApiRequest,
  NextApiResponse
> = async (req, res, next) => {
  const session = await getSession({ req });
  if (session === null) {
    res.status(401).end();
  } else {
    req.session = session;
    return next();
  }
};

export default sessionMiddleware;
