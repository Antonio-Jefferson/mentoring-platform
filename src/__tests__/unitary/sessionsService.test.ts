import sessionsService from "../../services/sessionsService";
import sessionsRepository from "../../repositories/sessionsRepository";
import userRepository from "../../repositories/userRepository";
import skillRepository from "../../repositories/skillRepository";
import { conflictError } from "../../errors/conflictError";
import { notFoundError } from "../../errors/notFoundError";
import googleCalendar from "../../services/googleCalendar";

jest.mock('../../repositories/sessionsRepository');
jest.mock('../../repositories/userRepository');
jest.mock('../../repositories/skillRepository');
jest.mock('../../services/googleCalendar');

describe('SessionService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create function', () => {
    it('should create a new session if mentor and skill exist and no conflicting session', async () => {
      const sessionData = {
        menteeId: 1,
        mentorId: 2,
        skillId: 3,
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 60 * 60 * 1000)
      };

      userRepository.mentorExists = jest.fn().mockResolvedValue(true);
      skillRepository.skillExists = jest.fn().mockResolvedValue(true);
      sessionsRepository.findConflictingSession = jest.fn().mockResolvedValue(null);
      sessionsRepository.create = jest.fn().mockResolvedValue({ id: 1, ...sessionData });

      const result = await sessionsService.create(sessionData);

      expect(userRepository.mentorExists).toHaveBeenCalledWith(sessionData.mentorId);
      expect(skillRepository.skillExists).toHaveBeenCalledWith(sessionData.skillId);
      expect(sessionsRepository.findConflictingSession).toHaveBeenCalledWith(sessionData.mentorId, sessionData.startTime, sessionData.endTime);
      expect(sessionsRepository.create).toHaveBeenCalledWith(sessionData);
      expect(result).toEqual({ id: 1, ...sessionData });
    });

    it('should throw notFoundError if the mentor does not exist', async () => {
      const sessionData = {
        menteeId: 1,
        mentorId: 2,
        skillId: 3,
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 60 * 60 * 1000),
      };

      userRepository.mentorExists = jest.fn().mockResolvedValue(false);

      await expect(sessionsService.create(sessionData)).rejects.toEqual(notFoundError("Mentor not found"));
    });

    it('should throw notFoundError if the skill does not exist', async () => {
      const sessionData = {
        menteeId: 1,
        mentorId: 2,
        skillId: 3,
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 60 * 60 * 1000),
      };

      userRepository.mentorExists = jest.fn().mockResolvedValue(true);
      skillRepository.skillExists = jest.fn().mockResolvedValue(false);

      await expect(sessionsService.create(sessionData)).rejects.toEqual(notFoundError("Skill not found"));
    });

    it('should throw conflictError if there is a conflicting session', async () => {
      const sessionData  = {
        menteeId: 1,
        mentorId: 2,
        skillId: 3,
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 60 * 60 * 1000),
      };

      userRepository.mentorExists = jest.fn().mockResolvedValue(true);
      skillRepository.skillExists = jest.fn().mockResolvedValue(true);
      sessionsRepository.findConflictingSession = jest.fn().mockResolvedValue({});

      await expect(sessionsService.create(sessionData)).rejects.toEqual(conflictError("Mentor is not available at the specified time"));
    });
  });

  describe('assessment function', () => {
    it('should update the assessment of a session if it exists', async () => {
      const sessionId = 1;
      const assessmentScore = 5;

      sessionsRepository.sessionExist = jest.fn().mockResolvedValue({ id: sessionId });

      await sessionsService.assessment(sessionId, assessmentScore);

      expect(sessionsRepository.assessment).toHaveBeenCalledWith(sessionId, assessmentScore);
    });

    it('should throw notFoundError if session does not exist', async () => {
      const sessionId = 1;
      const assessmentScore = 5;

      sessionsRepository.sessionExist = jest.fn().mockResolvedValue(null);

      await expect(sessionsService.assessment(sessionId, assessmentScore)).rejects.toEqual(notFoundError("session not found"));
    });
  });

  describe('changeStatus function', () => {
    it('should change the status of a session and create a Google Calendar event if the session exists', async () => {
      const sessionId = 1;
      const sessionData = {
        menteeId: 2,
        skillId: 3,
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 60 * 60 * 1000),
      };

      sessionsRepository.sessionExist = jest.fn().mockResolvedValue({ id: sessionId, ...sessionData });
      userRepository.menteeExists = jest.fn().mockResolvedValue({ name: "Mentee Name" });
      skillRepository.skillExists = jest.fn().mockResolvedValue({ name: "Skill Name" });
      const mockCreateEvent = jest.fn().mockResolvedValue(true);
      (googleCalendar.createEvent as jest.Mock) = mockCreateEvent;
      sessionsRepository.updateStatus = jest.fn().mockResolvedValue({ id: sessionId });

      const result = await sessionsService.changeStatus(sessionId);

      expect(mockCreateEvent).toHaveBeenCalled();
      expect(sessionsRepository.updateStatus).toHaveBeenCalledWith(sessionId);
      expect(result).toEqual({ id: sessionId });
    });

    it('should throw notFoundError if the session does not exist', async () => {
      const sessionId = 1;

      sessionsRepository.sessionExist = jest.fn().mockResolvedValue(null);

      await expect(sessionsService.changeStatus(sessionId)).rejects.toEqual(notFoundError("Session not found"));
    });
  });
});
