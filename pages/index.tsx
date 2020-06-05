import { GetServerSideProps } from "next";
import Link from "next/link";
import { PicrossProps } from "./picross/[id]";
import firebase from "../lib/firebase";

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

export const getServerSideProps: GetServerSideProps = async () => {
  const result = await firebase.collection("picross").get();
  const picrosses = result.docs.map((p) => ({ id: p.id, data: p.data()}));
  return {
    props: {
      picrosses: picrosses.map((p) => ({
        id: p.id,
        name: p.data.name
      })),
    }
  };
};

export default IndexPage;
