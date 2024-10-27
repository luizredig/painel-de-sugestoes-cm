import { Router } from "express";
import * as companyController from "../controllers/companyController";

const router = Router();

router.post("/companies", companyController.createCompany);
router.get("/companies", companyController.getAllCompanies);
router.get(
  "/companies/with-suggestions",
  companyController.getCompaniesWithSuggestions,
);
router.get("/companies/:id", companyController.getCompanyById);
router.patch("/companies/:id", companyController.updateCompany);

export default router;
