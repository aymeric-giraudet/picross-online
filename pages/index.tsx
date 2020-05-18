import { GetServerSideProps } from "next";
import Link from "next/link";
import { PicrossProps } from "./picross/[id]";
import nextConnect from "next-connect";
import middleware from "../middleware/database";

interface IndexProps {
  picrosses: PicrossProps[];
}

const IndexPage: React.FC<IndexProps> = (props) => (
  <ul>
    {props.picrosses.map((p) => (
      <li>
        <Link href="picross/[id]" as={`picross/${p.id}`}>{p.name}</Link>
      </li>
    ))}
  </ul>
);

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const handler = nextConnect();
  handler.use(middleware);
  //@ts-ignore
  await handler.apply(req, res);
  //@ts-ignore
  const picrosses = await req.db.collection("picross").find().toArray();
  return {
    props: {
      //@ts-ignore
      picrosses: picrosses.map((p) => ({
        id: p._id.toString(),
        name: p.name,
        solution: p.solution,
      })),
    }, // will be passed to the page component as props
  };
};

export default IndexPage;
