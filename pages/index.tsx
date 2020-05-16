import { GetStaticProps } from "next";
import Link from "next/link";
import { MongoClient } from "mongodb";
import { PicrossProps } from "./picross/[id]";

interface IndexProps {
  picrosses: PicrossProps[];
}

const IndexPage: React.FC<IndexProps> = (props) => (
  <ul>
    {props.picrosses.map((p) => (
      <li>
        <Link href={`picross/${p.id}`}>{p.name}</Link>
      </li>
    ))}
  </ul>
);

export const getStaticProps: GetStaticProps = async () => {
  const url = process.env.MONGO_URL || "mongodb://localhost";
  //@ts-ignore
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db("picross");
  const picrosses = await db.collection("picross").find().toArray();
  return {
    props: {
      picrosses: picrosses.map((p) => ({
        id: p._id.toString(),
        name: p.name,
        solution: p.solution,
      })),
    }, // will be passed to the page component as props
  };
};

export default IndexPage;
