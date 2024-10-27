import { Router } from "express";
import * as suggestionController from "../controllers/suggestionController";

const router = Router();

router.post("/suggestions", suggestionController.createSuggestion);
router.get("/suggestions", suggestionController.getAllSuggestions);
router.delete("/suggestions/:id", suggestionController.deleteSuggestion);
router.patch("/suggestions/:id", suggestionController.updateSuggestion);

export default router;
