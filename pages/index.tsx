import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

interface IndexProps {
  picrosses: Array<{ name: string; id: number }>;
}

const IndexPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => (
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

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const prisma = new PrismaClient();
  const picrosses = await prisma.picross.findMany();
  prisma.$disconnect();
  return {
    props: {
      picrosses: picrosses.map((picross) => ({
        id: picross.id,
        name: picross.name,
      })),
    },
    revalidate: 1,
  };
};

export default IndexPage;
