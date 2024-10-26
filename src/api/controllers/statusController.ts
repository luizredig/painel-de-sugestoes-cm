import { Request, Response } from "express";
import * as statusService from "../services/statusService";

export const createStatus = async (req: Request, res: Response) => {
  try {
    const status = await statusService.createStatus(req.body);
    res.status(201).json(status);
  } catch (error) {
    res.status(500).json({ message: "Error creating status", error });
  }
};

export const getAllStatuses = async (_: Request, res: Response) => {
  try {
    const statuses = await statusService.getAllStatuses();
    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching statuses", error });
  }
};
