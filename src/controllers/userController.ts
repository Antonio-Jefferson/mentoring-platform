import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";

async function create(req: Request, res: Response, next: NextFunction){
  const { name, email, password, role } = req.body;

  try {
    const newUser = await userService.create({name, email, password, role});
    return res.status(201).send(newUser);
  } catch(err){
    return res.status(500).send(err);
  }
}

async function  findAllMentors(req: Request, res: Response, next: NextFunction) {
  try {
    const mentors = await userService.findAllMentors();
    res.status(200).json(mentors);
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  findAllMentors
}