import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createStatus = async (data: any) => {
  return prisma.suggestionStatus.create({
    data,
  });
};

export const getAllStatuses = async () => {
  return prisma.suggestionStatus.findMany();
};
