import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient();
  const count = await prisma.picross.count();
  const skip = Math.floor(Math.random() * count);
  const picross = await prisma.picross.findMany({ take: 1, skip });
  prisma.$disconnect();
  return {
    redirect: {
      destination: `/picross/${picross[0].id}`,
      permanent: false,
    },
  };
};

export default function Random() {
  return <></>;
}
