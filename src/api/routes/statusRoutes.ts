import express, { Router } from "express";
import * as statusController from "../controllers/statusController.ts";

const router = Router();

router.post("/statuses", statusController.createStatus);
router.get("/statuses", statusController.getAllStatuses);

export default router;
