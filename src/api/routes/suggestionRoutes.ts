import { Router } from "express";
import * as suggestionController from "../controllers/suggestionController";

const router = Router();

router.post("/suggestions", suggestionController.createSuggestion);
router.get("/suggestions", suggestionController.getAllSuggestions);
router.delete("/suggestions/:id", suggestionController.deleteSuggestion);
router.patch("/suggestions/:id", suggestionController.updateSuggestion);
router.patch(
  "/suggestions/:id/status",
  suggestionController.updateSuggestionStatus,
);
router.patch(
  "/suggestions/:id/agents",
  suggestionController.updateSuggestionAgents,
);

export default router;
