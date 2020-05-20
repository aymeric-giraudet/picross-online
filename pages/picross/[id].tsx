import { GetStaticProps, GetStaticPaths } from "next";
import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/dist/client/router";
import { Hints } from "../../helpers/computeHints";

export interface PicrossProps {
  id: string;
  name: string;
  solution: number[][];
  hints: Hints;
}

const Picross: React.FC<PicrossProps> = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-end">
      <div className="flex">
        {props.hints.cols.map((c, idx) => (
          <div key={idx} className="flex-col w-12 even:bg-gray-200">
            {c.map((n, idx) => (
              <div key={idx} className="text-center text-3xl">{n}</div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex">
        <div className="flex-col">
          {props.hints.rows.map((c, idx) => (
            <div key={idx} className="flex text-right items-center h-12 even:bg-gray-200">
              {c.map((n, idx) => (
                <div key={idx} className="text-3xl px-1 flex-auto">{n}</div>
              ))}
            </div>
          ))}
        </div>
        <div className="grid-cols-5 inline-grid">
          {props.solution.map((r) =>
            r.map((c, idx) => (
              <div
                key={idx}
                className={
                  c === 0
                    ? "bg-gray-200 border border-black h-12 w-12"
                    : "bg-gray-600 border border-black h-12 w-12"
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

//@ts-ignore
export const getStaticPaths: GetStaticPaths = async () => {
  const url = process.env.MONGO_URL || "mongodb://localhost";
  //@ts-ignore
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db("picross");
  const picrosses = await db.collection("picross").find().toArray();
  const paths = picrosses.map((p) => ({ params: { id: p._id.toString() } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const url = process.env.MONGO_URL || "mongodb://localhost";
  //@ts-ignore
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db("picross");
  //@ts-ignore
  const id = new ObjectId(ctx?.params?.id);
  const picross = await db
    .collection("picross")
    //@ts-ignore
    .findOne({ _id: id });
  return {
    props: { solution: picross.solution, hints: picross.hints }, // will be passed to the page component as props
  };
};

export default Picross;
