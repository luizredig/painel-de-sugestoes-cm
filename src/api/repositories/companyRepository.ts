import { Company, PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const createCompany = async (
  data: Prisma.CompanyCreateInput,
): Promise<Company> => {
  return prisma.company.create({
    data,
  });
};

export const getAllCompanies = async (isActive?: boolean) => {
  return prisma.company.findMany({
    where: {
      isActive: isActive !== undefined ? isActive : undefined,
    },
  });
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
          company: true,
          status: true,
          agents: true,
        },
      },
    },
  });
};

export const getCompanyById = async ({ id }: { id: string }) => {
  return prisma.company.findUnique({ where: { id } });
};

export const updateCompany = async (
  id: string,
  data: Prisma.CompanyUpdateInput,
) => {
  return prisma.company.update({
    where: { id },
    data,
  });
};
