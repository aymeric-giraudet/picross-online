import { computeHints } from "../../helpers/computeHints";
import solve from "../../helpers/solve";
import middleware from "../../middleware";

interface CreatePicrossRequest {
  grid: string[][];
  name: string;
}

const handler = middleware.post(async (req, res) => {
  const body: CreatePicrossRequest = JSON.parse(req.body);
  const solution = body.grid.map((row) => row.map((cell) => cell === "filled"));
  const hints = computeHints(solution);
  const solvable = solve(hints);
  if (!solvable) {
    res.status(400).end();
  }
  const createdPicross = await req.prisma.picross.create({
    data: {
      name: body.name,
      author: { connect: { email: req.session.user.email } },
      ...hints,
      rowCount: hints.rows.length,
      colCount: hints.cols.length,
    },
  });
  res.end(createdPicross.id);
});

export default handler;
