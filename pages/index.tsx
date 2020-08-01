import { GetStaticProps } from "next";
import Link from "next/link";
import { PicrossProps } from "./picross/[id]";
import { MongoClient } from "mongodb";

interface IndexProps {
  picrosses: PicrossProps[];
}

const IndexPage: React.FC<IndexProps> = (props) => (
  <ul>
    {props.picrosses.map((p) => (
      <li key={p.id}>
        <Link href="picross/[id]" as={`picross/${p.id}`}>
          <a>{p.name}</a>
        </Link>
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
      //@ts-ignore
      picrosses: picrosses.map((p) => ({
        id: p._id.toString(),
        name: p.name,
        solution: p.solution,
      })),
    },
    revalidate: 1,
  };
};

export default IndexPage;
