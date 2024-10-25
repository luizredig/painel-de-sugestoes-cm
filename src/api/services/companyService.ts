import * as companyRepository from "../repositories/companyRepository";

export const createCompany = async (data: any) => {
  return await companyRepository.createCompany(data);
};

export const getAllCompanies = async () => {
  return await companyRepository.getAllCompanies();
};
