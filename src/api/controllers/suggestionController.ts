import { Request, Response } from "express";
import * as suggestionService from "../services/suggestionService";

export const getAllSuggestions = async (req: Request, res: Response) => {
  try {
    const isActiveParam = req.query.isActive as string;
    const isActive =
      isActiveParam === "true"
        ? true
        : isActiveParam === "false"
          ? false
          : undefined;
    const suggestions = await suggestionService.getAllSuggestions(isActive);
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching suggestions", error });
  }
};

export const createSuggestion = async (req: Request, res: Response) => {
  try {
    const suggestion = await suggestionService.createSuggestion(req.body);
    res.status(201).json(suggestion);
  } catch (error) {
    res.status(500).json({ message: "Error creating suggestion", error });
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

export const updateSuggestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedSuggestion = await suggestionService.updateSuggestion(
      id,
      req.body,
    );
    res.status(200).json(updatedSuggestion);
  } catch (error) {
    res.status(500).json({ message: "Error updating suggestion", error });
  }
};

export const updateSuggestionStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { statusSlug } = req.body;
    const updatedSuggestion = await suggestionService.updateSuggestionStatus(
      id,
      statusSlug,
    );
    res.status(200).json(updatedSuggestion);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating suggestion status", error });
  }
};

export const updateSuggestionAgents = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { agentIds } = req.body;
    const updatedSuggestion = await suggestionService.updateSuggestionAgents(
      id,
      agentIds,
    );
    res.status(200).json(updatedSuggestion);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating suggestion agents", error });
  }
};
