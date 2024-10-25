import express, { Router } from "express";
import * as companyController from "../controllers/companyController";

const router = Router();

router.post("/companies", companyController.createCompany);
router.get("/companies", companyController.getAllCompanies);

export default router;
