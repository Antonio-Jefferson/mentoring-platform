import { Skill } from "@prisma/client";

export function getAllSkills(){
  const skills: Skill[] = [
    {
      id: 1,
      name: 'java'
    },
    {
      id: 2,
      name: 'javScript'
    }
  ]
  return skills;
}