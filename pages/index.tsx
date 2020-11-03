import { GetStaticProps } from "next";
import Link from "next/link";
import { PicrossProps } from "./picross/[id]";
import { PrismaClient } from "@prisma/client";

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
  const prisma = new PrismaClient();
  const picrosses = await prisma.picross.findMany();
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
