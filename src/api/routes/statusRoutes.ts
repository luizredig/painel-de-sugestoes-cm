import { Router } from "express";
import * as statusController from "../controllers/statusController";

const router = Router();

router.post("/suggestion-status", statusController.createStatus);
router.get("/suggestion-status", statusController.getAllStatuses);

export default router;
