import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { Hints } from "../../helpers/computeHints";
import Picross from "../../components/picross/Picross";

export interface PicrossProps {
  hints: Hints;
  creator: { name: string | null; image: string | null };
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
  prisma.$disconnect();
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<PicrossProps> = async (ctx) => {
  const prisma = new PrismaClient();
  const id = ctx?.params?.id as string;
  const picross = await prisma.picross.findOne({
    where: { id: parseInt(id) },
    include: { author: true },
  });
  if (!picross) {
    return {
      notFound: true,
    };
  }
  prisma.$disconnect();
  return {
    props: {
      hints: {
        cols: picross.cols as number[][],
        rows: picross.rows as number[][],
      },
      creator: { name: picross.author.name, image: picross.author.image },
    },
  };
};

export default PicrossPage;
