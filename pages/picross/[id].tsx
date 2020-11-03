import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { Hints } from "../../helpers/computeHints";
import Picross from "../../components/picross/Picross";

export interface PicrossProps {
  id: string;
  name: string;
  solution: boolean[][];
  hints: Hints;
  creator: { name: string; image: string };
}

const PicrossPage: React.FC<PicrossProps> = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return <Picross hints={props.hints} creator={props.creator} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const prisma = new PrismaClient();
  const picrosses = await prisma.picross.findMany();
  const paths = picrosses.map((p) => ({ params: { id: p.id.toString() } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const prisma = new PrismaClient();
  const id = ctx?.params?.id || "0";
  if (typeof id !== "string") {
    return { props: {} };
  }
  const picross = await prisma.picross.findOne({
    where: { id: parseInt(id) },
    include: { author: true },
  });
  return {
    props: {
      hints: { cols: picross?.cols, rows: picross?.rows },
      creator: { name: picross?.author.name, image: picross?.author.image },
    }, // will be passed to the page component as props
  };
};

export default PicrossPage;
