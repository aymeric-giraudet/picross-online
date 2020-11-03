import { PrismaClient } from "@prisma/client";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

interface UserProps {
  name: string | null;
  picrosses: string[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prisma = new PrismaClient();
  const picrosses = await prisma.user.findMany();
  const paths = picrosses.map((p) => ({ params: { id: p.id.toString() } }));
  prisma.$disconnect();
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<UserProps> = async (ctx) => {
  const prisma = new PrismaClient();
  const id = parseInt(ctx?.params?.id as string);
  if (isNaN(id)) {
    return {
      notFound: true,
    };
  }
  const user = await prisma.user.findOne({
    where: { id },
    include: { picrosses: true },
  });
  if (!user) {
    return {
      notFound: true,
    };
  }
  prisma.$disconnect();
  return {
    props: {
      name: user.name,
      picrosses: user.picrosses.map((picross) => picross.name),
    },
  };
};

export default function User(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {props.name}
      <ul>
        {props.picrosses.map((picross) => (
          <li key={picross}>{picross}</li>
        ))}
      </ul>
    </div>
  );
}
