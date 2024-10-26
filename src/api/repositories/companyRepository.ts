import { Company, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCompany = async (
  data: Prisma.CompanyCreateInput,
): Promise<Company> => {
  return prisma.company.create({
    data,
  });
};

export const getAllCompanies = async () => {
  return prisma.company.findMany({});
};

export const getCompaniesWithSuggestions = async () => {
  return prisma.company.findMany({
    where: {
      suggestions: {
        some: {},
      },
    },
    include: {
      suggestions: {
        include: {
          agents: true,
        },
      },
    },
  });
};

export const getCompanyById = async ({ id }: { id: string }) => {
  return prisma.company.findUnique({ where: { id } });
};
