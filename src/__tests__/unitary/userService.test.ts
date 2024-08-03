import userService from "../../services/userService";
import userRepository from "../../repositories/userRepository";
import { duplicatedEmailError } from "../../services/errors";
import { notFoundError } from "../../errors/notFoundError";
import { Session, SessionStatus, User } from "@prisma/client";

jest.mock('../../repositories/userRepository');

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create function', () => {
    it('should create a new user', async () => {
      const userData: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'MENTOR',
      };

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(userRepository, 'create').mockResolvedValue(userData);

      const result = await userService.create(userData);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(userData.email);
      expect(userRepository.create).toHaveBeenCalledWith({
        name: userData.name,
        email: userData.email,
        password: expect.any(String),
        role: userData.role,
      });
      expect(result).toEqual(userData);
    });

    it('should throw duplicatedEmailError if the email is already in use', async () => {
      const userData: User = {
        id: 1,
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        role: 'MENTEE',
      };

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(userData);

      await expect(userService.create(userData)).rejects.toEqual(duplicatedEmailError());
      expect(userRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('findAllMentors function', () => {
    it('should return all mentors with average ratings', async () => {
      const mentors = [
        { id: 1, name: 'Mentor A', sessionsMentor: [{ rating: 4 }, { rating: 5 }] },
        { id: 2, name: 'Mentor B', sessionsMentor: [{ rating: 3 }, { rating: null }] },
      ];

      jest.spyOn(userRepository, 'findAllMentors').mockResolvedValue(mentors);

      const result = await userService.findAllMentors();

      expect(result).toEqual([
        { id: 1, name: 'Mentor A', averageRating: 4.5 },
        { id: 2, name: 'Mentor B', averageRating: 3 },
      ]);
      expect(userRepository.findAllMentors).toHaveBeenCalled();
    });
  });

  describe('findByMentorId function', () => {
    it('should return mentor details with average rating', async () => {
      const mentor = {
        id: 1,
        name: 'Mentor A',
        email: 'mentorA@example.com',
        skills: [{ name: 'JavaScript' }],
        sessionsMentor: [{ rating: 4 }, { rating: 5 }],
      };

      jest.spyOn(userRepository, 'findByMentorId').mockResolvedValue(mentor);

      const result = await userService.findByMentorId(mentor.id);

      expect(result).toEqual({
        id: mentor.id,
        name: mentor.name,
        email: mentor.email,
        skills: ['JavaScript'],
        averageRating: 4.5,
      });
    });

    it('should throw notFoundError if mentor does not exist', async () => {
      jest.spyOn(userRepository, 'findByMentorId').mockResolvedValue(null);

      await expect(userService.findByMentorId(1)).rejects.toEqual(notFoundError("Not Found"));
    });
  });

  describe('removeSkill function', () => {
    it('should remove a skill from a user', async () => {
      const userId = 1;
      const skillId = 1;

      jest.spyOn(userRepository, 'userHasSkill').mockResolvedValue(true);
      jest.spyOn(userRepository, 'removeSkill').mockResolvedValue(undefined);

      await userService.removeSkill(userId, skillId);

      expect(userRepository.userHasSkill).toHaveBeenCalledWith(userId, skillId);
      expect(userRepository.removeSkill).toHaveBeenCalledWith(userId, skillId);
    });

    it('should throw notFoundError if user does not have the skill', async () => {
      const userId = 1;
      const skillId = 1;

      jest.spyOn(userRepository, 'userHasSkill').mockResolvedValue(false);

      await expect(userService.removeSkill(userId, skillId)).rejects.toEqual(notFoundError("Skill not found for this user"));
      expect(userRepository.removeSkill).not.toHaveBeenCalled();
    });
  });

  describe('findMentorSchedule function', () => {
    it('should return mentor schedule with mentee details', async () => {
      const mentorId = 1;
      const schedule = [{
        id: 1,
        mentorId: mentorId,
        menteeId: 4,
        startTime: new Date(),
        endTime: new Date(),
        rating: null,
        skillId: 1,
        status: 'SCHEDULED' as SessionStatus,
        mentee: {
          id: 4,
          name: "Antônio Jefferson",
          email: "antjeffersonbatista@gmail.com",
      }
      }];

      jest.spyOn(userRepository, 'getMentorSchedule').mockResolvedValue(schedule);
      const result = await userService.findMentorSchedule(mentorId);

      expect(result).toEqual(schedule);
      expect(userRepository.getMentorSchedule).toHaveBeenCalledWith(mentorId);
    });
  });

  describe('findMenteeSchedule function', () => {
    it('should return mentee schedule', async () => {
      const menteeId = 1;
      const schedule = [{
        id: 1,
        mentorId: 1,
        menteeId: menteeId,
        startTime: new Date(),
        endTime: new Date(),
        rating: null,
        skillId: 1,
        status: 'SCHEDULED' as SessionStatus,
        mentor: {
          id: 2,
          name: "Mentor Name",
          email: "mentor@example.com"
        },
      }];

      jest.spyOn(userRepository, 'getMenteeSchedule').mockResolvedValue(schedule);

      const result = await userService.findMenteeSchedule(menteeId);

      expect(result).toEqual(schedule);
      expect(userRepository.getMenteeSchedule).toHaveBeenCalledWith(menteeId);
    });
  });
});
