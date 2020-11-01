import middleware from "../../middleware/database";
import { session } from "next-auth/client";
import { computeHints } from "../../helpers/computeHints";

const handler = middleware.post(async (req, res) => {
  const body = JSON.parse(req.body);
  const { user } = await session({ req });
  const solution = body.grid.map((row) => row.map((cell) => cell === "filled"));
  const hints = computeHints(solution);
  const test = await req.db
    .collection("picross")
    .insertOne({ name: body.name, solution, hints, author: user.email });
  console.log(test);
  res.end();
});

export default handler;
