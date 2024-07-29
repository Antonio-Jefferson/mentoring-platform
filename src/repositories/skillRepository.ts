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

export default {
  findAllSkills,
  skillExists
}