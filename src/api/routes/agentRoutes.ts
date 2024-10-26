import { Router } from "express";
import * as agentController from "../controllers/agentController";

const router = Router();

router.get("/agents", agentController.getAllAgents);

export default router;
