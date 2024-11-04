import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllStatuses = async () => {
  return prisma.suggestionStatus.findMany();
};

export const getStatusByName = async (name: string) => {
  return prisma.suggestionStatus.findFirst({
    where: { name },
  });
};

export const getStatusBySlug = async (slug: string) => {
  return prisma.suggestionStatus.findFirst({
    where: { slug },
  });
};

export const createStatus = async (
  data: Prisma.SuggestionStatusCreateInput,
) => {
  return prisma.suggestionStatus.create({
    data,
  });
};
