import { Request, Response, NextFunction } from "express";
import skillService from "../services/skillService";

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const skills = await skillService.findAllSkills(); 
    res.status(200).json(skills); 
  } catch (error) {
    next(error);
  }
}

export default {
  findAll
};