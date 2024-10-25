import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCompany = async (data: any) => {
  return prisma.company.create({
    data,
  });
};

export const getAllCompanies = async () => {
  return prisma.company.findMany();
};
