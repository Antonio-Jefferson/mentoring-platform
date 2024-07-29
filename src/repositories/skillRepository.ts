import { prisma } from '../config/database';
import { Skill } from '@prisma/client';

async function findAllSkills(): Promise<Skill[]> {
  return await prisma.skill.findMany();
}

async function skillExists(skillId: number) {
  return prisma.skill.findUnique({
    where: {
      id: skillId,
    },
  });
}

async function doesSkillExist(skill: string) {
  return prisma.skill.findFirst({
    where: {
      name: skill,
    },
  });
}


async function createSkill(skill: string){
  return await prisma.skill.create({
    data: { name: skill },
  });
}

async function skillExistsById(id: number){
  return await prisma.skill.findUnique({
    where: { id },
  });
}

export default {
  findAllSkills,
  skillExists,
  createSkill,
  skillExistsById,
  doesSkillExist
}