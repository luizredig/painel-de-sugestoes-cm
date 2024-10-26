import { Company, Prisma } from "@prisma/client";
import * as companyRepository from "../repositories/companyRepository";

export const createCompany = async (
  data: Prisma.CompanyCreateInput,
): Promise<Company> => {
  return await companyRepository.createCompany(data);
};

export const getAllCompanies = async () => {
  return await companyRepository.getAllCompanies();
};

export const getCompaniesWithSuggestions = async () => {
  return await companyRepository.getCompaniesWithSuggestions();
};

export const getCompanyById = async (id: string) => {
  return await companyRepository.getCompanyById({ id });
};
