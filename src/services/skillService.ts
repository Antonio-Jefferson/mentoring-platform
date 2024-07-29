import { conflictError } from "../errors/conflictError";
import skillRepository from "../repositories/skillRepository";
import userRepository from "../repositories/userRepository";

async function findAllSkills() {
  return await skillRepository.findAllSkills();
}

async function createSkill(skill: string, userId: number) {
  const skillExist = await skillRepository.doesSkillExist(skill);
  if (skillExist) {
    throw conflictError("Skill already exists");
  }

  const newSkill = await skillRepository.createSkill(skill);
  await userRepository.addSkillToUser(userId, newSkill.id);
}

export default {
  findAllSkills,
  createSkill
}