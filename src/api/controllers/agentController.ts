import { Request, Response } from "express";
import * as agentService from "../services/agentService";

export const getAllAgents = async (_: Request, res: Response) => {
  try {
    const agents = await agentService.getAllAgents();
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error });
  }
};
