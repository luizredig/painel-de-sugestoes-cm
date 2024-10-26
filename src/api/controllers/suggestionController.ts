import { Request, Response } from "express";
import * as suggestionService from "../services/suggestionService";

export const createSuggestion = async (req: Request, res: Response) => {
  try {
    const suggestion = await suggestionService.createSuggestion(req.body);
    res.status(201).json(suggestion);
  } catch (error) {
    res.status(500).json({ message: "Error creating suggestion", error });
  }
};

export const getAllSuggestions = async (req: Request, res: Response) => {
  try {
    const suggestions = await suggestionService.getAllSuggestions();
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching suggestions", error });
  }
};

export const deleteSuggestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await suggestionService.deleteSuggestion(id);
    res.status(200).json({ message: "Suggestion deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting suggestion", error });
  }
};
