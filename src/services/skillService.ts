import skillRepository from "../repositories/skillRepository";

async function findAllSkills() {
  return await skillRepository.findAllSkills();
}

export default {
  findAllSkills
}