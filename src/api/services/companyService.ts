import { Company, Prisma } from "@prisma/client";
import * as companyRepository from "../repositories/companyRepository";

export const createCompany = async (
  data: Prisma.CompanyCreateInput,
): Promise<Company> => {
  return await companyRepository.createCompany(data);
};

export const getAllCompanies = async (isActive?: boolean) => {
  return await companyRepository.getAllCompanies(isActive);
};

export const getCompaniesWithSuggestions = async () => {
  return await companyRepository.getCompaniesWithSuggestions();
};

export const getCompanyById = async (id: string) => {
  return await companyRepository.getCompanyById({ id });
};

export const updateCompany = async (
  id: string,
  data: Prisma.CompanyUpdateInput,
) => {
  return await companyRepository.updateCompany(id, data);
};
