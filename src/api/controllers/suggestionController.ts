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
    const suggestionData = req.body;
    const updatedSuggestion = await suggestionService.updateSuggestion(
      id,
      suggestionData,
    );
    res.status(200).json(updatedSuggestion);
  } catch (error) {
    res.status(500).json({ message: "Error updating suggestion", error });
  }
};

export const createSuggestion = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    // Set default isActive to true
    data.isActive = data.isActive !== undefined ? data.isActive : true;

    // Get or create 'Pendente' status
    const pendingStatus =
      await suggestionService.getOrCreateStatusByName("Pendente");
    data.statusId = pendingStatus.id;

    const suggestion = await suggestionService.createSuggestion(data);
    res.status(201).json(suggestion);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar sugestão", error });
  }
};
