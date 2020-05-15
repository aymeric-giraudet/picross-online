import { GetStaticProps } from "next";
import { MongoClient } from "mongodb";

interface IndexProps {
  solution: number[][];
}

const IndexPage: React.FC<IndexProps> = (props) => (
  <div className="container mx-auto">
    <div className="grid-cols-5 inline-grid">
      {props.solution.map((r) =>
        r.map((c) => (
          <div
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
);

export const getStaticProps: GetStaticProps = async () => {
  //@ts-ignore
  const client = new MongoClient(process.env.MONGO_URL && "mongodb://localhost", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db("picross");
  const picross = await db.collection("picross").findOne({});
  return {
    props: { solution: picross.solution }, // will be passed to the page component as props
  };
};

export default IndexPage;
