import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import skillRepository from "../repositories/skillRepository";
import { notFoundError } from "../errors/notFoundError";
import userRepository from "../repositories/userRepository";
import { conflictError } from "../errors/conflictError";

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

async function addSkill(req: Request, res: Response, next: NextFunction) {
  const {skillId, userId} = req.body;
  try {
    await addExistingSkill(Number(skillId), Number(userId));
    res.status(200).send({ message: "Skill added successfully" });
  } catch (error) {
    next(error)
  }
}

async function addExistingSkill(skillId: number, userId: number) {
  const skillExists = await skillRepository.skillExistsById(skillId);

  if (!skillExists) {
    throw notFoundError("Skill does not exist");
  }

  const userHasSkill = await userRepository.userHasSkill(userId, skillId);

  if (userHasSkill) {
    throw conflictError("Skill already added to user");
  }

  await userRepository.addSkillToUser(userId, skillId);
}

export default {
  create,
  findAllMentors,
  findByMentorId,
  addSkill
}