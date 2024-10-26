import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createStatus = async (
  data: Prisma.SuggestionStatusCreateInput,
) => {
  return prisma.suggestionStatus.create({
    data,
  });
};

export const getAllStatuses = async () => {
  return prisma.suggestionStatus.findMany();
};
