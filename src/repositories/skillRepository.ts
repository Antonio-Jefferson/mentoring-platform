import { prisma } from '../config/database';
import { Skill } from '@prisma/client';

async function findAllSkills(): Promise<Skill[]> {
  return await prisma.skill.findMany();
}

export default {
  findAllSkills
}