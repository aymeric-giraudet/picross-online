import { GetStaticProps, GetStaticPaths } from "next";
import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/dist/client/router";
import { Hints } from "../../helpers/computeHints";
import Picross from "../../components/picross/Picross";
import firebase from "../../lib/firebase";
import { mapToArray } from "../../helpers/mapToFirebase";

export interface PicrossProps {
  id: string;
  name: string;
  solution: boolean[][];
  hints: Hints;
}

const PicrossPage: React.FC<PicrossProps> = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return <Picross hints={props.hints} solution={props.solution} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await firebase.collection("picross").get();
  const paths = result.docs.map((p) => ({ params: { id: p.id } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = ctx.params?.id.toString() as string;
  const result = await firebase.collection("picross").doc(id).get();
  const picross = result.data();
  if (!picross) {
    return { props: { notFound: true } };
  }
  return {
    props: { solution: picross.solution.map(mapToArray), hints: { rows: picross.hints.rows.map(mapToArray), cols: picross.hints.cols.map(mapToArray) } },
  };
};

export default PicrossPage;
