import { Router } from "express";
import * as statusController from "../controllers/statusController";

const router = Router();

router.post("/statuses", statusController.createStatus);
router.get("/statuses", statusController.getAllStatuses);

export default router;
