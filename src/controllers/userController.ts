import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";

async function create(req: Request, res: Response, next: NextFunction){
  const { name, email, password, role } = req.body;

  try {
    const newUser = await userService.create({name, email, password, role});
    return res.status(201).send(newUser);
  } catch(err){
    next(err);
  }
}

async function  findAllMentors(req: Request, res: Response, next: NextFunction) {
  try {
    const mentors = await userService.findAllMentors();
    res.status(200).send(mentors);
  } catch (error) {
    next(error);
  }
}

async function findByMentorId(req: Request, res: Response, next: NextFunction) {
  const { mentorId } = req.params
  try {
    const mentor = await userService.findByMentorId(Number(mentorId));
    res.status(200).send(mentor);
  } catch (error) {
    next(error)
  }
}

export default {
  create,
  findAllMentors,
  findByMentorId
}