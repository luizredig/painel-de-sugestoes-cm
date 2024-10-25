import express, { Router } from "express";
import * as suggestionController from "../controllers/suggestionController.ts";

const router = Router();

router.post("/suggestions", suggestionController.createSuggestion);
router.get("/suggestions", suggestionController.getAllSuggestions);
router.delete("/suggestions/:id", suggestionController.deleteSuggestion);

export default router;
