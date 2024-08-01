import skillService from "../../services/skillService"; 
import skillRepository from "../../repositories/skillRepository"; 
import userRepository from "../../repositories/userRepository"; 
import { conflictError } from "../../errors/conflictError"; 
import { GetUserMentor } from "../factories/getUserMentorFactory"; 
import { getAllSkills } from "../factories/getAllSkillsFactory";


jest.mock('../../repositories/skillRepository');
jest.mock('../../repositories/userRepository');


describe('SkillService', ()=> {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('findAllSkills fuction', ()=> {
      it('should find all skill', async () => {
        const skills = getAllSkills();
        jest.spyOn(skillRepository, 'findAllSkills').mockResolvedValue(skills);

        const listSkill = await skillService.findAllSkills();

        expect(listSkill).toEqual(skills);
        expect(skillRepository.findAllSkills).toHaveBeenCalled();
      })
  });

  describe('createSkill function', () => {
    it('should create a new skill and add it to the user', async () => {
      const user = GetUserMentor();
      const skill = 'TypeScript';
      const userId = 1;
      const newSkill = { id: 1, name: skill };

      jest.spyOn(skillRepository, 'doesSkillExist').mockResolvedValue(null);
      jest.spyOn(skillRepository, 'createSkill').mockResolvedValue(newSkill);
      jest.spyOn(userRepository, 'addSkillToUser').mockResolvedValue(user);

      const result = await skillService.createSkill(skill, userId);

      expect(skillRepository.doesSkillExist).toHaveBeenCalledWith(skill);
      expect(skillRepository.createSkill).toHaveBeenCalledWith(skill);
      expect(userRepository.addSkillToUser).toHaveBeenCalledWith(userId, newSkill.id);
      expect(result).toBeUndefined();
    });

    it('should throw a conflict error if the skill already exists', async () => {
      const skill = 'TypeScript';
      const userId = 1;

      jest.spyOn(skillRepository, 'doesSkillExist').mockResolvedValue({id: 1, name: "TypeScript"});
      await expect(skillService.createSkill(skill, userId)).rejects.toEqual(conflictError("Skill already exists"));
    });
  });
})

