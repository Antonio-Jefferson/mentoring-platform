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

async function createSkill(req: Request, res:Response, next: NextFunction) {
  const { skill } = req.body
  const { userId } = req.params
  try {
    const newsKill = await skillService.createSkill(skill, Number(userId));
    res.status(201).send(newsKill)
  } catch (error) {
    next(error)
  }
}

export default {
  findAll,
  createSkill
};