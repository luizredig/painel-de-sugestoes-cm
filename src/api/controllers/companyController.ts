import { Request, Response } from "express";
import * as companyService from "../services/companyService";

export const createCompany = async (req: Request, res: Response) => {
  try {
    const company = await companyService.createCompany(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: "Error creating company", error });
  }
};

export const getAllCompanies = async (_: Request, res: Response) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error });
  }
};

export const getCompaniesWithSuggestions = async (
  _: Request,
  res: Response,
) => {
  try {
    const companies = await companyService.getCompaniesWithSuggestions();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const company = await companyService.getCompanyById(id);
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: "Error fetching company", error });
  }
};
